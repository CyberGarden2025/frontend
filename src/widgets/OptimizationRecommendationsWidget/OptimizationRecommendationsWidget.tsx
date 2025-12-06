import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { Button } from '@shared/ui';
import { ChatIcon } from '@shared/ui/icons';
import styles from './OptimizationRecommendationsWidget.module.scss';

export interface Recommendation {
    id: string;
    title: string;
    description: string;
    category: string;
    potentialSavings: number;
    priority: 'high' | 'medium' | 'low';
}

export interface OptimizationRecommendationsWidgetProps {
    recommendations: Recommendation[];
    onAskAboutRecommendation?: (recommendation: Recommendation) => void;
    className?: string;
    style?: React.CSSProperties;
}

export const OptimizationRecommendationsWidget: FC<OptimizationRecommendationsWidgetProps> = ({
    recommendations,
    onAskAboutRecommendation,
    className,
    style,
}) => {
    const navigate = useNavigate();

    const formatAmount = (amount: number): string => {
        return new Intl.NumberFormat('ru-RU').format(amount);
    };

    const getPriorityColor = (priority: string): string => {
        switch (priority) {
            case 'high':
                return '#dc3545';
            case 'medium':
                return '#ffc107';
            case 'low':
                return '#28a745';
            default:
                return '#999999';
        }
    };

    const getPriorityLabel = (priority: string): string => {
        switch (priority) {
            case 'high':
                return 'Высокий';
            case 'medium':
                return 'Средний';
            case 'low':
                return 'Низкий';
            default:
                return '';
        }
    };

    const sortedRecommendations = [...recommendations].sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

    return (
        <div className={clsx(styles.root, className)} style={style}>
            <div className={styles.header}>
                <h2 className={styles.title}>Рекомендации по оптимизации</h2>
            </div>

            <div className={styles.recommendationsList}>
                {sortedRecommendations.map((recommendation) => (
                    <div key={recommendation.id} className={styles.recommendationItem}>
                        <div className={styles.recommendationHeader}>
                            <div className={styles.recommendationTitle}>{recommendation.title}</div>
                            <div
                                className={styles.priorityBadge}
                                style={{ backgroundColor: getPriorityColor(recommendation.priority) }}
                            >
                                {getPriorityLabel(recommendation.priority)}
                            </div>
                        </div>
                        <div className={styles.recommendationDescription}>{recommendation.description}</div>
                        <div className={styles.recommendationFooter}>
                            <div className={styles.recommendationCategory}>{recommendation.category}</div>
                            <div className={styles.recommendationSavings}>
                                Экономия: {formatAmount(recommendation.potentialSavings)} ₽/мес
                            </div>
                        </div>
                        <div className={styles.recommendationAction}>
                            <Button
                                label="Уточнить в чате"
                                variant="secondary"
                                state="default"
                                size="medium"
                                icon={<ChatIcon />}
                                showIcon={true}
                                onClick={() => {
                                    if (onAskAboutRecommendation) {
                                        onAskAboutRecommendation(recommendation);
                                    } else {
                                        const message = `Расскажи подробнее о рекомендации: "${recommendation.title}". ${recommendation.description}`;
                                        navigate('/chat', { state: { message } });
                                    }
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

