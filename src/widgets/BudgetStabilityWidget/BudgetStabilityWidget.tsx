import { type FC } from 'react';
import clsx from 'clsx';
import { Button } from '@shared/ui';
import { ChatIcon } from '@shared/ui/icons';
import styles from './BudgetStabilityWidget.module.scss';

export interface BudgetStabilityWidgetProps {
    stabilityScore: number;
    monthlyIncome: number;
    monthlyExpenses: number;
    mandatoryPayments: number;
    discretionarySpending: number;
    onAskAssistant?: (message: string) => void;
    className?: string;
    style?: React.CSSProperties;
}

export const BudgetStabilityWidget: FC<BudgetStabilityWidgetProps> = ({
    stabilityScore,
    monthlyIncome,
    monthlyExpenses,
    mandatoryPayments,
    discretionarySpending,
    onAskAssistant,
    className,
    style,
}) => {
    const formatAmount = (amount: number): string => {
        return new Intl.NumberFormat('ru-RU').format(amount);
    };

    const getStabilityLevel = (score: number): { label: string; color: string } => {
        if (score >= 80) {
            return { label: 'Отличная', color: '#28a745' };
        }
        if (score >= 60) {
            return { label: 'Хорошая', color: '#ffc107' };
        }
        if (score >= 40) {
            return { label: 'Средняя', color: '#fd7e14' };
        }
        return { label: 'Низкая', color: '#dc3545' };
    };

    const stability = getStabilityLevel(stabilityScore);
    const mandatoryPercentage = monthlyIncome > 0 ? (mandatoryPayments / monthlyIncome) * 100 : 0;
    const discretionaryPercentage = monthlyIncome > 0 ? (discretionarySpending / monthlyIncome) * 100 : 0;

    return (
        <div className={clsx(styles.root, className)} style={style}>
            <div className={styles.header}>
                <h2 className={styles.title}>Устойчивость бюджета</h2>
            </div>

            <div className={styles.scoreSection}>
                <div className={styles.scoreValue} style={{ color: stability.color }}>
                    {stabilityScore.toFixed(0)}
                </div>
                <div className={styles.scoreLabel} style={{ color: stability.color }}>
                    {stability.label}
                </div>
                <div className={styles.scoreBar}>
                    <div
                        className={styles.scoreBarFill}
                        style={{
                            width: `${stabilityScore}%`,
                            backgroundColor: stability.color,
                        }}
                    />
                </div>
            </div>

            <div className={styles.breakdown}>
                <div className={styles.breakdownItem}>
                    <div className={styles.breakdownLabel}>Обязательные платежи</div>
                    <div className={styles.breakdownValue}>
                        {formatAmount(mandatoryPayments)} ₽ ({mandatoryPercentage.toFixed(1)}%)
                    </div>
                </div>
                <div className={styles.breakdownItem}>
                    <div className={styles.breakdownLabel}>Произвольные траты</div>
                    <div className={styles.breakdownValue}>
                        {formatAmount(discretionarySpending)} ₽ ({discretionaryPercentage.toFixed(1)}%)
                    </div>
                </div>
                <div className={styles.breakdownItem}>
                    <div className={styles.breakdownLabel}>Доходы</div>
                    <div className={styles.breakdownValue}>{formatAmount(monthlyIncome)} ₽</div>
                </div>
                <div className={styles.breakdownItem}>
                    <div className={styles.breakdownLabel}>Расходы</div>
                    <div className={styles.breakdownValue}>{formatAmount(monthlyExpenses)} ₽</div>
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
                        onClick={() => onAskAssistant('Расскажи подробнее об устойчивости моего бюджета')}
                    />
                </div>
            )}
        </div>
    );
};

