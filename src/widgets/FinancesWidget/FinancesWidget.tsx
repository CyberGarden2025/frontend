import { type FC } from 'react';
import clsx from 'clsx';
import { IconButton, Button } from '@shared/ui';
import { SettingsIcon, MoreIcon } from '@shared/ui/icons';
import styles from './FinancesWidget.module.scss';

export interface FinancesWidgetProps {
    income: number;
    expenses: number;
    period?: string;
    onPeriodChange?: (period: string) => void;
    className?: string;
    style?: React.CSSProperties;
}

export const FinancesWidget: FC<FinancesWidgetProps> = ({
    income,
    expenses,
    period = 'Месяц',
    onPeriodChange,
    className,
    style,
}) => {
    const formatAmount = (amount: number): string => {
        return new Intl.NumberFormat('ru-RU').format(amount);
    };

    const incomePercentage = income + expenses > 0 ? (income / (income + expenses)) * 100 : 0;
    const expensesPercentage = income + expenses > 0 ? (expenses / (income + expenses)) * 100 : 0;

    return (
        <div className={clsx(styles.root, className)} style={style}>
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <div className={styles.iconButtonWrapper}>
                        <IconButton
                            icon={<SettingsIcon />}
                            variant="secondary"
                            state="default"
                            size="medium"
                        />
                    </div>
                    <h2 className={styles.title}>Финансы</h2>
                </div>
                <div className={styles.headerRight}>
                    <Button
                        label={period}
                        variant="primary"
                        state="default"
                        size="medium"
                        icon={
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        }
                        showIcon={true}
                        onClick={() => onPeriodChange?.(period)}
                    />
                </div>
            </div>

            <div className={styles.summaryContainer}>
                <div className={styles.summaryDetails}>
                    <div className={styles.incomeContainer}>
                        <p className={styles.summaryLabel}>Поступления</p>
                        <div className={styles.summaryValue}>
                            <span className={styles.valueMain}>{formatAmount(income)}</span>
                            <span className={styles.valueCurrency}>₽</span>
                        </div>
                    </div>

                    <div className={styles.chartContainer}>
                        <div className={styles.chartBar}>
                            <div className={styles.chartBarDivider}></div>
                            <div
                                className={styles.chartBarFill}
                                style={{
                                    flex: incomePercentage,
                                    backgroundColor: 'var(--brand-default, #50b848)',
                                }}
                            ></div>
                        </div>
                    </div>

                    <div className={styles.expenseDetails}>
                        <div className={styles.expenseContainer}>
                            <p className={styles.summaryLabel}>Расходы</p>
                            <div className={styles.summaryValue}>
                                <span className={styles.valueMain}>{formatAmount(expenses)}</span>
                                <span className={styles.valueCurrency}>₽</span>
                            </div>
                        </div>
                        <div className={styles.chartBar}>
                            <div className={styles.chartBarDivider}></div>
                            <div
                                className={styles.chartBarFill}
                                style={{
                                    flex: expensesPercentage,
                                    backgroundColor: 'var(--fg-soft, #999999)',
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
