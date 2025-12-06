import { type FC } from 'react';
import clsx from 'clsx';
import { MessageButtons } from '@shared/ui/MessageButtons';
import type { MessageButton } from '@shared/ui/MessageButtons';
import styles from './Message.module.scss';

export interface MessageProps {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp?: Date;
    buttons?: MessageButton[];
    isComplete?: boolean;
    onButtonClick?: (button: MessageButton) => void;
    className?: string;
    style?: React.CSSProperties;
}

export const Message: FC<MessageProps> = ({
    content,
    role,
    timestamp,
    buttons,
    onButtonClick,
    className,
    style,
}) => {
    const isUser = role === 'user';
    const showButtons = !isUser && buttons && buttons.length > 0 && onButtonClick;

    return (
        <div
            className={clsx(
                styles.root,
                isUser ? styles.userMessage : styles.assistantMessage,
                className
            )}
            style={style}
        >
            <div className={styles.content}>
                {content}
            </div>
            {showButtons && (
                <MessageButtons
                    buttons={buttons}
                    onButtonClick={onButtonClick}
                />
            )}
            {timestamp && (
                <div className={styles.timestamp}>
                    {timestamp.toLocaleTimeString('ru-RU', {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </div>
            )}
        </div>
    );
};

