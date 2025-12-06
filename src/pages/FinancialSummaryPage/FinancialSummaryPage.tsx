import { type FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExpensesWidget, CategoriesWidget, OperationsWidget } from '@widgets';
import { IconButton, Button } from '@shared/ui';
import { ExpenseFilters } from '@entities/expense';
import {
    ArrowBackIcon,
    SearchIcon,
    MoreIcon,
    SettingsIcon,
    CalendarIcon,
    ChatIcon,
    ExpandIcon,
    FilterIcon,
    RefreshIcon,
    KanbanIcon,
} from '@shared/ui/icons';
import type { Category } from '@shared/ui';
import styles from './FinancialSummaryPage.module.scss';

export const FinancialSummaryPage: FC = () => {
    const navigate = useNavigate();
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    const handleChatClick = () => {
        navigate('/chat');
    };

    const pieChartCategories: Category[] = [
        {
            name: 'Продукты',
            value: 30,
        },
        {
            name: 'Ипотека',
            value: 15,
        },
        {
            name: 'Автотовары',
            value: 15,
        },
        {
            name: 'Детские товары',
            value: 12,
        },
        {
            name: 'Подписки и сервисы',
            value: 10,
        },
    ];

    const chartValues: [number, number, number, number, number, number, number] = [
        25000, 30000, 35000, 28000, 109592, 25000, 32000,
    ];

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

                    <h1 className={styles.title}>Сводка <br/>по финансам</h1>

                    <div className={styles.actions}>
                        <IconButton
                            icon={<SettingsIcon />}
                            variant="primary"
                            state="default"
                            size="medium"
                        />
                        <IconButton
                            icon={<CalendarIcon />}
                            variant="primary"
                            state="default"
                            size="medium"
                        />
                        <Button
                            label="Новая категория"
                            variant="primary"
                            state="default"
                            size="medium"
                            icon={<ExpandIcon />}
                            showIcon={true}
                        />
                        <Button
                            label="Обсудить в чате"
                            variant="primary"
                            state="default"
                            size="medium"
                            icon={<ExpandIcon />}
                            showIcon={true}
                        />
                    </div>
                </div>

                <div className={styles.widgets}>
                    <ExpensesWidget
                        monthlyAmount={109592}
                        monthLabel="за декабрь"
                        chartValues={chartValues}
                        leftIcon={<KanbanIcon />}
                        rightIcons={[
                            { icon: <FilterIcon />, onClick: () => setIsFiltersOpen(true) },
                            { icon: <ChatIcon />, badge: true, badgeValue: '3', onClick: handleChatClick },
                            { icon: <ExpandIcon /> },
                        ]}
                    />

                    <CategoriesWidget
                        title="Категории"
                        subtitle="за декабрь"
                        categories={pieChartCategories}
                        leftIcon={<RefreshIcon />}
                        rightIcons={[
                            { icon: <FilterIcon />, onClick: () => setIsFiltersOpen(true) },
                            { icon: <ChatIcon />, badge: true, badgeValue: '1', onClick: handleChatClick },
                            { icon: <ExpandIcon /> },
                        ]}
                    />

                    <OperationsWidget
                        title="Операции"
                        leftIcon={<KanbanIcon />}
                        periodButtonLabel="Месяц"
                        income={229910}
                        expenses={109592}
                        incomeBarHeight={36}
                        expensesBarHeight={36}
                    />
                </div>
            </div>
            <ExpenseFilters isOpen={isFiltersOpen} setIsOpen={setIsFiltersOpen} />
        </div>
    );
};

