import { IconButton, type Category } from '@shared/ui';
import {
    AddIcon,
    ArrowBackIcon,
    ChatIcon,
    GraphIcon,
    MoreIcon,
    SearchIcon,
    SettingsIcon,
} from '@shared/ui/icons';
import cls from './CategoryPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { CategoriesWidget } from '@widgets';
import type { LimitCardProps } from '@entities/limit/ui/LimitCard/LimitCard.props';
import { LimitCard } from '@entities/limit';
import { useGetLimitsQuery } from '@shared/api';
import type { ExpenseType } from '@entities/expense';

export const CategoryPage = () => {
    const navigate = useNavigate();
    const { data: limitsData } = useGetLimitsQuery();

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

    const limits: LimitCardProps[] = limitsData
        ? limitsData.map((limit, index) => ({
              id: index + 1,
              name: limit.name,
              category: (limit.categories[0] || 'Food') as ExpenseType,
              income: limit.limit,
              expense: limit.spent,
              color: undefined,
          }))
        : [];
    return (
        <div className={cls.root}>
            <div className={cls.container}>
                <div className={cls.header}>
                    <div className={cls.header}>
                        <div className={cls.headerTop}>
                            <IconButton
                                icon={<ArrowBackIcon />}
                                variant="primary"
                                state="default"
                                size="large"
                                onClick={() => navigate(-1)}
                            />
                            <div className={cls.headerTopRight}>
                                <IconButton
                                    onClick={() => navigate('/categories/limit/new')}
                                    icon={<AddIcon />}
                                    variant="primary"
                                    state="default"
                                    size="large"
                                />
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
                        <h1 className={cls.title}>Категории</h1>
                    </div>
                </div>
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
                            icon: (
                                <div
                                    onClick={() => navigate('/categories')}
                                    style={{ transform: 'rotate(135deg)' }}
                                >
                                    <ArrowBackIcon />
                                </div>
                            ),
                            badge: false,
                        },
                    ]}
                />
                <div className={cls.limitWrapper}>
                    <h1 className={cls.title}>Мои лимиты</h1>
                    <ul className={cls.list}>
                        {limits.map(item => (
                            <LimitCard key={item.id} {...item} />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
