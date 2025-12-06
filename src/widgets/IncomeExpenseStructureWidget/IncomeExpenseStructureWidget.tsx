import { type FC } from 'react';
import clsx from 'clsx';
import { PieChart, Button } from '@shared/ui';
import { ChatIcon } from '@shared/ui/icons';
import type { Category } from '@shared/ui';
import styles from './IncomeExpenseStructureWidget.module.scss';

export interface IncomeExpenseStructureWidgetProps {
    incomeCategories: Category[];
    expenseCategories: Category[];
    totalIncome: number;
    totalExpenses: number;
    onAskAssistant?: (message: string) => void;
    className?: string;
    style?: React.CSSProperties;
}

export const IncomeExpenseStructureWidget: FC<IncomeExpenseStructureWidgetProps> = ({
    incomeCategories,
    expenseCategories,
    totalIncome,
    totalExpenses,
    onAskAssistant,
    className,
    style,
}) => {
    const formatAmount = (amount: number): string => {
        return new Intl.NumberFormat('ru-RU').format(amount);
    };

    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

    const handleAskAssistant = () => {
        if (onAskAssistant) {
            onAskAssistant('Расскажи подробнее о структуре моих доходов и расходов');
        }
    };

    return (
        <div className={clsx(styles.root, className)} style={style}>
            <div className={styles.header}>
                <h2 className={styles.title}>Структура доходов и расходов</h2>
            </div>

            <div className={styles.summary}>
                <div className={styles.summaryItem}>
                    <div className={styles.summaryLabel}>Доходы</div>
                    <div className={styles.summaryValueIncome}>{formatAmount(totalIncome)} ₽</div>
                </div>
                <div className={styles.summaryItem}>
                    <div className={styles.summaryLabel}>Расходы</div>
                    <div className={styles.summaryValueExpense}>{formatAmount(totalExpenses)} ₽</div>
                </div>
                <div className={styles.summaryItem}>
                    <div className={styles.summaryLabel}>Накопления</div>
                    <div className={styles.summaryValueSavings}>
                        {formatAmount(totalIncome - totalExpenses)} ₽ ({savingsRate.toFixed(1)}%)
                    </div>
                </div>
            </div>

            <div className={styles.chartsContainer}>
                <div className={styles.chartSection}>
                    <h3 className={styles.chartTitle}>Доходы</h3>
                    <PieChart categories={incomeCategories} />
                </div>
                <div className={styles.chartSection}>
                    <h3 className={styles.chartTitle}>Расходы</h3>
                    <PieChart categories={expenseCategories} />
                </div>
            </div>

            {onAskAssistant && (
                <div className={styles.footer}>
                    <Button
                        label="Спросить ассистента"
                        variant="primary"
                        state="default"
                        size="medium"
                        icon={<ChatIcon />}
                        showIcon={true}
                        onClick={handleAskAssistant}
                    />
                </div>
            )}
        </div>
    );
};

