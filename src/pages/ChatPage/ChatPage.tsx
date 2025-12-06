import { type FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IconButton } from '@shared/ui';
import { MessageList } from '@shared/ui/MessageList';
import { MessageInput } from '@shared/ui/MessageInput';
import { ArrowBackIcon, MoreIcon } from '@shared/ui/icons';
import { useChat } from '@features/chat';
import styles from './ChatPage.module.scss';

export const ChatPage: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const initialMessage = location.state?.message || new URLSearchParams(location.search).get('message') || undefined;
    const { messages, isLoading, error, sendMessage, handleButtonClick, clearMessages } = useChat({ initialMessage });

    return (
        <div className={styles.root}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.headerTop}>
                        <IconButton
                            icon={<ArrowBackIcon />}
                            variant="primary"
                            state="default"
                            size="large"
                            onClick={() => navigate(-1)}
                        />
                        <div className={styles.headerTopRight}>
                            <IconButton
                                icon={<MoreIcon />}
                                variant="primary"
                                state="default"
                                size="large"
                                onClick={clearMessages}
                            />
                        </div>
                    </div>
                    <h1 className={styles.title}>Чат</h1>
                </div>

                <div className={styles.chatContainer}>
                    <MessageList
                        messages={messages}
                        isLoading={isLoading}
                        onButtonClick={handleButtonClick}
                    />
                    {error && (
                        <div className={styles.error}>
                            {error}
                        </div>
                    )}
                </div>

                <MessageInput
                    onSend={sendMessage}
                    placeholder="Введите сообщение..."
                    disabled={isLoading}
                />
            </div>
        </div>
    );
};

