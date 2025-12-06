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

export const useChat = (options?: UseChatOptions): UseChatReturn => {
    const { initialMessage } = options || {};
    const [messages, setMessages] = useState<ChatMessage[]>([]);
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
            setMessages(convertedMessages);
        } catch (err: unknown) {
            console.error('Ошибка при загрузке сообщений:', err);
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

                setMessages(convertedMessages);

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
        setMessages([]);
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

