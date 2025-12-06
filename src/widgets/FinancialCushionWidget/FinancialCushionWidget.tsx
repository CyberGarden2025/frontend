import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { Button } from '@shared/ui';
import { ChatIcon } from '@shared/ui/icons';
import styles from './FinancialCushionWidget.module.scss';

export interface FinancialCushionWidgetProps {
    currentSavings: number;
    recommendedCushion: number;
    monthlyExpenses: number;
    monthsCovered: number;
    onAskAssistant?: (message: string) => void;
    className?: string;
    style?: React.CSSProperties;
}

export const FinancialCushionWidget: FC<FinancialCushionWidgetProps> = ({
    currentSavings,
    recommendedCushion,
    monthlyExpenses,
    monthsCovered,
    onAskAssistant,
    className,
    style,
}) => {
    const navigate = useNavigate();

    const formatAmount = (amount: number): string => {
        return new Intl.NumberFormat('ru-RU').format(amount);
    };

    const progress = recommendedCushion > 0 ? (currentSavings / recommendedCushion) * 100 : 0;
    const remaining = Math.max(0, recommendedCushion - currentSavings);
    const recommendedMonths = 6;

    const getProgressColor = (progress: number): string => {
        if (progress >= 100) return '#28a745';
        if (progress >= 50) return '#ffc107';
        return '#dc3545';
    };

    return (
        <div className={clsx(styles.root, className)} style={style}>
            <div className={styles.header}>
                <h2 className={styles.title}>Финансовая подушка</h2>
            </div>

            <div className={styles.cushionSection}>
                <div className={styles.currentAmount}>
                    <div className={styles.amountLabel}>Текущие накопления</div>
                    <div className={styles.amountValue}>{formatAmount(currentSavings)} ₽</div>
                </div>

                <div className={styles.progressSection}>
                    <div className={styles.progressHeader}>
                        <div className={styles.progressLabel}>Рекомендуемая подушка</div>
                        <div className={styles.progressValue}>{formatAmount(recommendedCushion)} ₽</div>
                    </div>
                    <div className={styles.progressBar}>
                        <div
                            className={styles.progressBarFill}
                            style={{
                                width: `${Math.min(progress, 100)}%`,
                                backgroundColor: getProgressColor(progress),
                            }}
                        />
                    </div>
                    <div className={styles.progressText}>
                        {progress >= 100 ? (
                            <span style={{ color: '#28a745' }}>Цель достигнута!</span>
                        ) : (
                            <span>Осталось накопить: {formatAmount(remaining)} ₽</span>
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.infoSection}>
                <div className={styles.infoItem}>
                    <div className={styles.infoLabel}>Месяцев покрытия</div>
                    <div className={styles.infoValue}>{monthsCovered.toFixed(1)} мес.</div>
                </div>
                <div className={styles.infoItem}>
                    <div className={styles.infoLabel}>Рекомендуется</div>
                    <div className={styles.infoValue}>{recommendedMonths} мес. расходов</div>
                </div>
                <div className={styles.infoItem}>
                    <div className={styles.infoLabel}>Месячные расходы</div>
                    <div className={styles.infoValue}>{formatAmount(monthlyExpenses)} ₽</div>
                </div>
            </div>

            <div className={styles.footer}>
                <Button
                    label="Спросить ассистента"
                    variant="primary"
                    state="default"
                    size="medium"
                    icon={<ChatIcon />}
                    showIcon={true}
                    onClick={() => {
                        const message = 'Расскажи подробнее о моей финансовой подушке и как её увеличить';
                        if (onAskAssistant) {
                            onAskAssistant(message);
                        } else {
                            navigate('/chat', { state: { message } });
                        }
                    }}
                />
            </div>
        </div>
    );
};

