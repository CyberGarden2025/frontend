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

const items: LimitCardProps[] = [
    {
        category: 'Food',
        expense: 2000,
        id: 1,
        income: 3000,
        name: 'Rockets.Coffee',
        color: '#F7B980',
    },
];

export const CategoryPage = () => {
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

    const navigate = useNavigate();
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
                        {items.map(item => (
                            <LimitCard key={item.id} {...item} />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
