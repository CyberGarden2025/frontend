import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@shared/ui';
import { ArrowBackIcon, SearchIcon, MoreIcon } from '@shared/ui/icons';
import {
    IncomeExpenseStructureWidget,
    BudgetStabilityWidget,
    FinancialCushionWidget,
    OptimizationRecommendationsWidget,
} from '@widgets';
import type { Category } from '@shared/ui';
import type { Recommendation } from '@widgets';
import styles from './FinancialForecastPage.module.scss';

export const FinancialForecastPage: FC = () => {
    const navigate = useNavigate();

    const handleAskAssistant = (message: string) => {
        navigate('/chat', { state: { message } });
    };

    const handleAskAboutRecommendation = (recommendation: Recommendation) => {
        const message = `Расскажи подробнее о рекомендации: "${recommendation.title}". ${recommendation.description}`;
        navigate('/chat', { state: { message } });
    };

    const incomeCategories: Category[] = [
        { name: 'Зарплата', value: 70 },
        { name: 'Подработка', value: 20 },
        { name: 'Инвестиции', value: 10 },
    ];

    const expenseCategories: Category[] = [
        { name: 'Обязательные', value: 45 },
        { name: 'Продукты', value: 25 },
        { name: 'Развлечения', value: 15 },
        { name: 'Транспорт', value: 10 },
        { name: 'Прочее', value: 5 },
    ];

    const recommendations: Recommendation[] = [
        {
            id: '1',
            title: 'Сократить расходы на развлечения',
            description: 'Уменьшите траты на развлечения на 20%, это позволит сэкономить значительную сумму без ущерба для качества жизни.',
            category: 'Развлечения',
            potentialSavings: 5000,
            priority: 'high',
        },
        {
            id: '2',
            title: 'Оптимизировать подписки',
            description: 'Проанализируйте активные подписки и отмените неиспользуемые сервисы.',
            category: 'Подписки',
            potentialSavings: 2000,
            priority: 'medium',
        },
        {
            id: '3',
            title: 'Пересмотреть транспортные расходы',
            description: 'Рассмотрите возможность использования общественного транспорта или каршеринга вместо личного автомобиля.',
            category: 'Транспорт',
            potentialSavings: 3000,
            priority: 'medium',
        },
        {
            id: '4',
            title: 'Планировать покупки продуктов',
            description: 'Составляйте список покупок заранее и следуйте ему, чтобы избежать импульсивных покупок.',
            category: 'Продукты',
            potentialSavings: 2500,
            priority: 'low',
        },
    ];

    const totalIncome = 229910;
    const totalExpenses = 109592;
    const monthlyIncome = 229910;
    const monthlyExpenses = 109592;
    const mandatoryPayments = 49316;
    const discretionarySpending = 60276;
    const stabilityScore = 72;
    const currentSavings = 150000;
    const recommendedCushion = monthlyExpenses * 6;
    const monthsCovered = currentSavings / monthlyExpenses;

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
                                icon={<SearchIcon />}
                                variant="primary"
                                state="default"
                                size="large"
                            />
                            <IconButton
                                icon={<MoreIcon />}
                                variant="primary"
                                state="default"
                                size="large"
                            />
                        </div>
                    </div>
                    <h1 className={styles.title}>Финансовое <br/>прогнозирование</h1>
                </div>

                <div className={styles.widgets}>
                    <IncomeExpenseStructureWidget
                        incomeCategories={incomeCategories}
                        expenseCategories={expenseCategories}
                        totalIncome={totalIncome}
                        totalExpenses={totalExpenses}
                        onAskAssistant={handleAskAssistant}
                    />

                    <BudgetStabilityWidget
                        stabilityScore={stabilityScore}
                        monthlyIncome={monthlyIncome}
                        monthlyExpenses={monthlyExpenses}
                        mandatoryPayments={mandatoryPayments}
                        discretionarySpending={discretionarySpending}
                        onAskAssistant={handleAskAssistant}
                    />

                    <FinancialCushionWidget
                        currentSavings={currentSavings}
                        recommendedCushion={recommendedCushion}
                        monthlyExpenses={monthlyExpenses}
                        monthsCovered={monthsCovered}
                        onAskAssistant={handleAskAssistant}
                    />

                    <OptimizationRecommendationsWidget
                        recommendations={recommendations}
                        onAskAboutRecommendation={handleAskAboutRecommendation}
                    />
                </div>
            </div>
        </div>
    );
};

