import { type FC, useEffect, useRef } from 'react';
import { Message } from '@shared/ui/Message';
import type { MessageProps } from '@shared/ui/Message';
import type { MessageButton } from '@shared/ui/MessageButtons';
import styles from './MessageList.module.scss';

export interface MessageListProps {
    messages: MessageProps[];
    isLoading?: boolean;
    onButtonClick?: (button: MessageButton) => void;
    className?: string;
    style?: React.CSSProperties;
}

export const MessageList: FC<MessageListProps> = ({
    messages,
    isLoading = false,
    onButtonClick,
    className,
    style,
}) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;
    const showLoader = isLoading || (lastMessage?.role === 'assistant' && lastMessage?.isComplete === false);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, showLoader]);

    return (
        <div ref={containerRef} className={`${styles.root} ${className || ''}`} style={style}>
            {messages.length === 0 ? (
                <div className={styles.emptyState}>
                    <div className={styles.emptyStateText}>
                        Начните диалог, отправив сообщение
                    </div>
                </div>
            ) : (
                <>
                    {messages.map((message) => (
                        <Message
                            key={message.id}
                            id={message.id}
                            content={message.content}
                            role={message.role}
                            timestamp={message.timestamp}
                            buttons={message.buttons}
                            onButtonClick={onButtonClick}
                            isComplete={message.isComplete}
                        />
                    ))}
                    {showLoader && (
                        <div className={styles.loadingContainer}>
                            <div className={styles.loadingMessage}>
                                <div className={styles.loadingDots}>
                                    <span className={styles.loadingDot}></span>
                                    <span className={styles.loadingDot}></span>
                                    <span className={styles.loadingDot}></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </>
            )}
        </div>
    );
};

