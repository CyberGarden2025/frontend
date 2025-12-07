import clsx from 'clsx';
import { type FC, type ReactNode, useEffect } from 'react';
import { IconButton, Button } from '@shared/ui';
import { useGetMonthSummaryMutation } from '@shared/api';
import styles from './OperationsWidget.module.scss';
import { FinanceBarWidget } from '@widgets/FInanceBarWidget';

export interface OperationsWidgetProps {
    title: string;
    leftIcon?: ReactNode;
    periodButtonLabel?: string;
    income?: number;
    expenses?: number;
    incomeBarHeight?: number;
    expensesBarHeight?: number;
    className?: string;
    style?: React.CSSProperties;
}

export const OperationsWidget: FC<OperationsWidgetProps> = ({
    title,
    leftIcon,
    periodButtonLabel = 'Месяц',
    income: propIncome,
    expenses: propExpenses,
    incomeBarHeight = 36,
    expensesBarHeight = 36,
    className,
    style,
}) => {
    const [getMonthSummary, { data: monthSummaryData }] = useGetMonthSummaryMutation();

    useEffect(() => {
        getMonthSummary({
            monthDate: '01/12/2023',
        });
    }, [getMonthSummary]);

    const formatAmount = (amount: number): string => {
        return amount.toLocaleString('ru-RU');
    };

    const income = monthSummaryData?.income ?? propIncome ?? 0;
    const expenses = monthSummaryData?.expenses ?? propExpenses ?? 0;

    const incomeFormatted = formatAmount(income);
    const expensesFormatted = formatAmount(expenses);

    const total = income + expenses;
    const incomePercentage = total > 0 ? (income / total) * 100 : 50;
    const expensesPercentage = total > 0 ? (expenses / total) * 100 : 50;

    return (
        <div className={clsx(styles.root, className)} style={style}>
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    {leftIcon && (
                        <div className={styles.leftIconContainer}>
                            <IconButton
                                icon={leftIcon}
                                variant="secondary"
                                state="default"
                                size="medium"
                                badge={false}
                            />
                        </div>
                    )}
                    <h2 className={styles.title}>{title}</h2>
                </div>
                <Button label={periodButtonLabel} variant="primary" state="default" size="medium" />
            </div>

            <FinanceBarWidget income={1200.22} expense={2000.2} />
        </div>
    );
};
