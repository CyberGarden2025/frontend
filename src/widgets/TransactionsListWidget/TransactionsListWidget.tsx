import clsx from 'clsx';
import { type FC, useMemo } from 'react';
import { TransactionCard } from '@shared/ui';
import type { TransactionCardProps } from '@shared/ui';
import styles from './TransactionsListWidget.module.scss';

export interface Transaction {
    id?: string;
    operationLabel: string;
    value: number;
    category?: string;
    icon?: TransactionCardProps['icon'];
    date: Date | string;
    onClick?: () => void;
}

export interface TransactionsListWidgetProps {
    transactions: Transaction[];
    className?: string;
    style?: React.CSSProperties;
}

const formatDateLabel = (date: Date): string => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const dateToCheck = new Date(date);
    dateToCheck.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    yesterday.setHours(0, 0, 0, 0);

    if (dateToCheck.getTime() === today.getTime()) {
        return 'Сегодня';
    }
    if (dateToCheck.getTime() === yesterday.getTime()) {
        return 'Вчера';
    }

    return dateToCheck.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
};

const groupTransactionsByDay = (transactions: Transaction[]): Map<string, Transaction[]> => {
    const grouped = new Map<string, Transaction[]>();

    transactions.forEach((transaction) => {
        const date = typeof transaction.date === 'string' ? new Date(transaction.date) : transaction.date;
        const dateKey = date.toISOString().split('T')[0];

        if (!grouped.has(dateKey)) {
            grouped.set(dateKey, []);
        }
        grouped.get(dateKey)?.push(transaction);
    });

    return grouped;
};

export const TransactionsListWidget: FC<TransactionsListWidgetProps> = ({
    transactions,
    className,
    style,
}) => {
    const groupedTransactions = useMemo(() => {
        const grouped = groupTransactionsByDay(transactions);
        const sortedDates = Array.from(grouped.keys()).sort((a, b) => {
            return new Date(b).getTime() - new Date(a).getTime();
        });

        return sortedDates.map((dateKey) => {
            const dayTransactions = grouped.get(dateKey) || [];
            const date = new Date(dateKey);
            const totalAmount = dayTransactions.reduce((sum, t) => sum + t.value, 0);

            return {
                dateKey,
                date,
                label: formatDateLabel(date),
                transactions: dayTransactions,
                totalAmount,
            };
        });
    }, [transactions]);

    const formatAmount = (amount: number): string => {
        return amount.toLocaleString('ru-RU');
    };

    return (
        <div className={clsx(styles.root, className)} style={style}>
            {groupedTransactions.map((dayGroup) => (
                <div key={dayGroup.dateKey} className={styles.dayGroup}>
                    <div className={styles.dayHeader}>
                        <p className={styles.dayLabel}>{dayGroup.label}</p>
                        <div className={styles.divider} />
                        <p className={styles.dayAmount}>
                            {formatAmount(dayGroup.totalAmount)} ₽
                        </p>
                    </div>

                    <div className={styles.transactionsList}>
                        {dayGroup.transactions.map((transaction, index) => (
                            <TransactionCard
                                key={transaction.id || index}
                                operationLabel={transaction.operationLabel}
                                value={transaction.value}
                                category={transaction.category}
                                icon={transaction.icon}
                                onClick={transaction.onClick}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};


