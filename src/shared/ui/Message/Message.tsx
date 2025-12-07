import { type FC } from 'react';
import clsx from 'clsx';
import { MessageButtons } from '@shared/ui/MessageButtons';
import type { MessageButton } from '@shared/ui/MessageButtons';
import { PieChart, Chart } from '@shared/ui';
import type { Category } from '@shared/ui/PieChart';
import { parseChartData, extractTextFromMessage } from '@shared/lib/utils';
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
    
    const chartData = !isUser ? parseChartData(content) : null;
    const textContent = chartData ? extractTextFromMessage(content, chartData) : content;
    const hasText = textContent.trim().length > 0;

    return (
        <div
            className={clsx(
                styles.root,
                isUser ? styles.userMessage : styles.assistantMessage,
                className
            )}
            style={style}
        >
            {hasText && (
                <div className={styles.content}>
                    {textContent}
                </div>
            )}
            {chartData && (
                <div className={styles.chartContainer}>
                    {chartData.type === 'pieChart' && (
                        <PieChart
                            categories={chartData.data as Category[]}
                            className={styles.chart}
                        />
                    )}
                    {chartData.type === 'chart' && (
                        <Chart
                            values={chartData.data as [number, number, number, number, number, number, number]}
                            className={styles.chart}
                        />
                    )}
                </div>
            )}
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

