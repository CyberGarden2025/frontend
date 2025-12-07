import { type FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Button } from '@shared/ui';
import {
    SettingsIcon,
    FilterIcon,
    CalendarIcon,
    ChatIcon,
    KanbanIcon,
    GraphIcon,
    RefreshIcon,
    ArrowBackIcon,
} from '@shared/ui/icons';
import {
    TotalFundsWidget,
    OperationsWidget,
    ExpensesWidget,
    CategoriesWidget,
} from '@widgets';
import type { Category } from '@shared/ui';
import maleMemojisSvg from '@shared/assets/Male Memojis.svg';
import imageSvg from '@shared/assets/Image (1).svg';
import styles from './MainPage.module.scss';

export const MainPage: FC = () => {
    const [period, setPeriod] = useState('Месяц');
    const navigate = useNavigate()
    const totalAmount = 420318;
    const decimalAmount = 0;
    const monthsCovered = 3;
    const notificationCount = 3;

    const income = 529910;
    const expenses = 109592;

    const expensesChartValues: [number, number, number, number, number, number, number] = [
        25000, 30000, 35000, 28000, 109592, 25000, 32000,
    ];

    const categories: Category[] = [
        { name: 'Продукты', value: 30 },
        { name: 'Ипотека', value: 25 },
        { name: 'Автотовары', value: 20 },
        { name: 'Детские товары', value: 15 },
        { name: 'Подписки и сервисы', value: 10 },
    ];

    const handleChatClick = () => {
        navigate('/chat');
    };

    return (
        <div className={styles.root}>
            <img src={imageSvg} alt="Background decoration" className={styles.backgroundImage} />
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.headerTop}>
                        <div className={styles.headerTopRight}>
                            <IconButton
                                icon={<RefreshIcon />}
                                variant="primary"
                                state="default"
                                size="large"
                            />
                        </div>
                        <div className={styles.headerTitle}>
                            <h1 className={styles.title}>поток</h1>
                        </div>
                        <div className={styles.headerAvatar}>
                            <div className={styles.avatar}>
                                <img
                                    src={maleMemojisSvg}
                                    alt="Avatar"
                                    className={styles.avatarImage}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.greeting}>
                        <p className={styles.greetingText}>
                            Привет, <br />
                            Владимир
                        </p>
                    </div>
                </div>

                <div className={styles.content}>
                    <TotalFundsWidget
                        totalAmount={totalAmount}
                        decimalAmount={decimalAmount}
                        monthsCovered={monthsCovered}
                        notificationCount={notificationCount}
                    />

                    <OperationsWidget
                        title="Финансы"
                        leftIcon={<SettingsIcon />}
                        periodButtonLabel={period}
                        income={income}
                        expenses={expenses}
                        incomeBarHeight={36}
                        expensesBarHeight={36}
                    />

                    <div className={styles.actionsRow}>
                        <IconButton
                            icon={<FilterIcon />}
                            variant="primary"
                            state="default"
                            size="large"
                        />
                        <IconButton
                            icon={<CalendarIcon />}
                            variant="primary"
                            state="default"
                            size="large"
                        />
                        <Button
                            label="Новая категория"
                            variant="primary"
                            state="default"
                            size="large"
                            icon={
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 3.33333V12.6667" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M3.33333 8H12.6667" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            }
                            showIcon={true}
                            onClick={() => navigate('/operations')}
                        />
                        <Button
                            label="Обсудить в чате"
                            variant="primary"
                            state="default"
                            size="large"
                            icon={<ChatIcon />}
                            showIcon={true}
                            onClick={handleChatClick}
                        />
                    </div>

                    <ExpensesWidget
                        monthlyAmount={89592}
                        monthLabel="за декабрь"
                        chartValues={expensesChartValues}
                        leftIcon={<KanbanIcon />}
                        rightIcons={[
                            {
                                icon: <SettingsIcon />,
                                badge: false,
                            },
                            {
                                icon: <ChatIcon />,
                                badge: true,
                                badgeValue: '3',
                                onClick: handleChatClick,
                            },
                            {
                                icon: <div style={{transform: "rotate(135deg)"}}><ArrowBackIcon /></div>,
                                badge: false,
                                onClick: () => navigate('/financial-summary'),
                            },
                        ]}
                    />

                    <CategoriesWidget
                        title="Категории"
                        subtitle="за декабрь"
                        categories={categories}
                        leftIcon={<GraphIcon />}
                        rightIcons={[
                            {
                                icon: <SettingsIcon />,
                                badge: false,
                            },
                            {
                                icon: <ChatIcon />,
                                badge: true,
                                badgeValue: '1',
                                onClick: handleChatClick,
                            },
                            {
                                icon: <div onClick={() => navigate("/categories")} style={{transform: "rotate(135deg)"}}><ArrowBackIcon /></div>,
                                badge: false,
                            },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};
