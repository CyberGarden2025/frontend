import { type FC, useMemo } from 'react';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
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

// Configure markdown parser once for the chat bubbles
marked.setOptions({
    gfm: true,
    breaks: true,
});

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
    const renderedContent = useMemo(() => {
        if (!content) return '';

        try {
            // marked.parse is sync in this setup; cast keeps TS happy
            const html = marked.parse(content) as string;
            return DOMPurify.sanitize(html, {
                ADD_ATTR: ['target', 'rel'],
            });
        } catch (error) {
            console.error('Failed to render message markdown:', error);
            const fallback = content.replace(/\n/g, '<br>');
            return DOMPurify.sanitize(fallback);
        }
    }, [content]);

    return (
        <div
            className={clsx(
                styles.root,
                isUser ? styles.userMessage : styles.assistantMessage,
                className
            )}
            style={style}
        >
            <div
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: renderedContent }}
            />
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
