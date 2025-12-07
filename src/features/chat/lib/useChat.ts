import { useState, useCallback, useEffect, useRef } from 'react';
import type { MessageButton } from '@shared/ui/MessageButtons';
import { useLazyGetMessagesQuery, useQueueMessageMutation } from '@shared/api/messagesApi';
import type { BackendMessage } from '@shared/api/messagesApi';

export interface ChatMessage {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
    buttons?: MessageButton[];
    isComplete?: boolean;
}

export interface UseChatOptions {
    initialMessage?: string;
}

export interface UseChatReturn {
    messages: ChatMessage[];
    isLoading: boolean;
    error: string | null;
    sendMessage: (message: string) => Promise<void>;
    handleButtonClick: (button: MessageButton) => void;
    clearMessages: () => void;
    refreshMessages: () => void;
}

const USER_UUID = '123e4567-e89b-12d3-a456-426614174000';
const CHAT_UUID = '760beced-f714-4151-8540-dc59c4671a4c';

if (import.meta.env.DEV) {
    console.log('[Chat] USER_UUID:', USER_UUID);
    console.log('[Chat] CHAT_UUID:', CHAT_UUID);
}

const convertBackendMessage = (msg: BackendMessage): ChatMessage => ({
    id: msg.id,
    content: msg.content,
    role: msg.role === 'assistant' ? 'assistant' : 'user',
    timestamp: new Date(msg.created_at),
    isComplete: msg.is_complete,
});

const POLLING_INTERVAL = 2000;
const MAX_POLLING_ATTEMPTS = 60;

const MOCK_CHART_MESSAGES: ChatMessage[] = [
    {
        id: 'mock-pie-chart-1',
        content: 'Вот ваш график расходов по категориям: {"type": "pieChart", "data": [{"name": "Продукты", "value": 30}, {"name": "Ипотека", "value": 15}, {"name": "Автотовары", "value": 15}, {"name": "Детские товары", "value": 12}, {"name": "Подписки и сервисы", "value": 10}, {"name": "Развлечения", "value": 8}, {"name": "Одежда", "value": 6}, {"name": "Здоровье", "value": 4}]}',
        role: 'assistant',
        timestamp: new Date(),
        isComplete: true,
    },
    {
        id: 'mock-chart-1',
        content: 'График расходов за последние 7 дней: {"type": "chart", "data": [25000, 30000, 35000, 28000, 109592, 25000, 32000]}',
        role: 'assistant',
        timestamp: new Date(Date.now() - 60000),
        isComplete: true,
    },
    {
        id: 'mock-pie-chart-2',
        content: 'Распределение доходов: {"type": "pieChart", "data": [{"name": "Зарплата", "value": 70}, {"name": "Инвестиции", "value": 15}, {"name": "Подарки", "value": 10}, {"name": "Прочее", "value": 5}]}',
        role: 'assistant',
        timestamp: new Date(Date.now() - 120000),
        isComplete: true,
    },
    {
        id: 'mock-chart-2',
        content: 'Динамика расходов по неделям: {"type": "chart", "data": [45000, 52000, 48000, 61000, 55000, 67000, 59000]}',
        role: 'assistant',
        timestamp: new Date(Date.now() - 180000),
        isComplete: true,
    },
    {
        id: 'mock-pie-chart-3',
        content: 'Расходы на продукты по магазинам: {"type": "pieChart", "data": [{"name": "Пятёрочка", "value": 40}, {"name": "Магнит", "value": 25}, {"name": "Перекрёсток", "value": 20}, {"name": "Ашан", "value": 10}, {"name": "Другие", "value": 5}]}',
        role: 'assistant',
        timestamp: new Date(Date.now() - 240000),
        isComplete: true,
    },
];

export const useChat = (options?: UseChatOptions): UseChatReturn => {
    const { initialMessage } = options || {};
    const [messages, setMessages] = useState<ChatMessage[]>(MOCK_CHART_MESSAGES);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const hasInitializedRef = useRef(false);
    const initialMessageRef = useRef(initialMessage);
    const pollingIntervalRef = useRef<number | null>(null);
    const expectedMessageIdRef = useRef<string | null>(null);
    const pollingAttemptsRef = useRef(0);

    const [getMessages, { isLoading: isFetchingMessages }] = useLazyGetMessagesQuery();
    const [queueMessage, { isLoading: isQueueingMessage }] = useQueueMessageMutation();

    const stopPolling = useCallback(() => {
        if (pollingIntervalRef.current !== null) {
            clearInterval(pollingIntervalRef.current);
            pollingIntervalRef.current = null;
        }
        expectedMessageIdRef.current = null;
        pollingAttemptsRef.current = 0;
        setIsLoading(false);
    }, []);

    const refreshMessages = useCallback(async () => {
        try {
            if (import.meta.env.DEV) {
                console.log('[Chat] refreshMessages - using USER_UUID:', USER_UUID, 'CHAT_UUID:', CHAT_UUID);
            }
            const result = await getMessages({
                user_uuid: USER_UUID,
                chat_uuid: CHAT_UUID,
                order_by: 'created_at',
                order_direction: 'asc',
            }).unwrap();

            const backendMessages = result.messages || [];
            const convertedMessages = backendMessages.map(convertBackendMessage);
            
            if (convertedMessages.length > 0) {
                setMessages([...MOCK_CHART_MESSAGES, ...convertedMessages]);
            } else {
                setMessages(MOCK_CHART_MESSAGES);
            }
        } catch (err: unknown) {
            console.error('Ошибка при загрузке сообщений:', err);
            setMessages(MOCK_CHART_MESSAGES);
            if (err && typeof err === 'object' && 'data' in err) {
                const errorData = err.data as { detail?: string; message?: string };
                const errorMessage = errorData?.detail || errorData?.message || 'Ошибка при загрузке сообщений';
                setError(errorMessage);
            } else {
                setError(err instanceof Error ? err.message : 'Ошибка при загрузке сообщений');
            }
        }
    }, [getMessages]);

    const startPolling = useCallback(async (expectedMessageId: string) => {
        expectedMessageIdRef.current = expectedMessageId;
        pollingAttemptsRef.current = 0;

        const poll = async () => {
            if (pollingAttemptsRef.current >= MAX_POLLING_ATTEMPTS) {
                stopPolling();
                setError('Превышено время ожидания ответа от сервера');
                return;
            }

            pollingAttemptsRef.current += 1;

            try {
                const result = await getMessages({
                    user_uuid: USER_UUID,
                    chat_uuid: CHAT_UUID,
                    order_by: 'created_at',
                    order_direction: 'asc',
                }).unwrap();

                const backendMessages = result.messages || [];
                const convertedMessages = backendMessages.map(convertBackendMessage);

                if (convertedMessages.length > 0) {
                    setMessages([...MOCK_CHART_MESSAGES, ...convertedMessages]);
                } else {
                    setMessages(MOCK_CHART_MESSAGES);
                }

                const foundMessage = backendMessages.find((msg) => msg.id === expectedMessageId);
                if (foundMessage && foundMessage.is_complete) {
                    stopPolling();
                }
            } catch (err) {
                console.error('Ошибка при опросе сообщений:', err);
            }
        };

        poll();
        pollingIntervalRef.current = window.setInterval(poll, POLLING_INTERVAL);
    }, [getMessages, stopPolling]);

    const sendMessage = useCallback(async (content: string) => {
        if (!content.trim()) {
            return;
        }

        stopPolling();
        setIsLoading(true);
        setError(null);

        try {
            if (import.meta.env.DEV) {
                console.log('[Chat] sendMessage - using USER_UUID:', USER_UUID, 'CHAT_UUID:', CHAT_UUID);
            }
            const response = await queueMessage({
                content,
                user_uuid: USER_UUID,
                chat_uuid: CHAT_UUID,
            }).unwrap();

            const aiMessageId = response.ai_message_id;

            await refreshMessages();

            if (aiMessageId) {
                startPolling(aiMessageId);
            } else {
                setIsLoading(false);
            }
        } catch (err: unknown) {
            console.error('Ошибка при отправке сообщения:', err);
            if (err && typeof err === 'object' && 'data' in err) {
                const errorData = err.data as { detail?: string; message?: string };
                const errorMessage = errorData?.detail || errorData?.message || 'Ошибка при отправке сообщения';
                setError(errorMessage);
            } else {
                setError(err instanceof Error ? err.message : 'Ошибка при отправке сообщения');
            }
            setIsLoading(false);
        }
    }, [queueMessage, refreshMessages, startPolling, stopPolling]);

    const handleButtonClick = useCallback((button: MessageButton) => {
        sendMessage(button.label);
    }, [sendMessage]);

    const clearMessages = useCallback(() => {
        stopPolling();
        setMessages(MOCK_CHART_MESSAGES);
        setError(null);
        hasInitializedRef.current = false;
        initialMessageRef.current = undefined;
    }, [stopPolling]);

    useEffect(() => {
        if (initialMessage) {
            initialMessageRef.current = initialMessage;
        }
    }, [initialMessage]);

    useEffect(() => {
        if (!hasInitializedRef.current) {
            hasInitializedRef.current = true;
            refreshMessages().then(() => {
                if (initialMessageRef.current) {
                    setTimeout(() => {
                        sendMessage(initialMessageRef.current!);
                    }, 300);
                }
            });
        }
    }, []);

    useEffect(() => {
        return () => {
            stopPolling();
        };
    }, [stopPolling]);

    useEffect(() => {
        setIsLoading(isQueueingMessage || isFetchingMessages || pollingIntervalRef.current !== null);
    }, [isQueueingMessage, isFetchingMessages]);

    return {
        messages,
        isLoading,
        error,
        sendMessage,
        handleButtonClick,
        clearMessages,
        refreshMessages,
    };
};

