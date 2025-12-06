import { type FC, useState, KeyboardEvent, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { IconButton } from '@shared/ui';
import { ChatIcon } from '@shared/ui/icons';
import styles from './MessageInput.module.scss';

export interface MessageInputProps {
    onSend: (message: string) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

export const MessageInput: FC<MessageInputProps> = ({
    onSend,
    placeholder = 'Введите сообщение...',
    disabled = false,
    className,
    style,
}) => {
    const [message, setMessage] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
        }
    };

    useEffect(() => {
        adjustTextareaHeight();
    }, [message]);

    const handleSend = () => {
        if (message.trim() && !disabled) {
            onSend(message.trim());
            setMessage('');
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }
        }
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    };

    return (
        <div className={clsx(styles.root, className)} style={style}>
            <div className={styles.inputContainer}>
                <textarea
                    ref={textareaRef}
                    className={styles.input}
                    value={message}
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                    placeholder={placeholder}
                    disabled={disabled}
                    rows={1}
                />
                <IconButton
                    icon={<ChatIcon />}
                    variant="primary"
                    state="default"
                    size="medium"
                    onClick={handleSend}
                    disabled={disabled || !message.trim()}
                    className={styles.sendButton}
                />
            </div>
        </div>
    );
};

