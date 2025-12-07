import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, NotificationItem } from '@shared/ui';
import { ArrowBackIcon, SearchIcon, MoreIcon, WalletIcon, ShoppingIcon, GraphIcon, ReceiptIcon, StarIcon, QuestionIcon } from '@shared/ui/icons';
import styles from './NotificationsPage.module.scss';

export const NotificationsPage: FC = () => {
    const navigate = useNavigate();

    const handleDeleteNotification = (id: string) => {
        console.log('Delete notification:', id);
    };

    return (
        <div className={styles.root}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.headerTop}>
                        <IconButton
                            icon={<div style={{ transform: 'rotate(90deg)' }}><ArrowBackIcon /></div>}
                            variant="primary"
                            state="default"
                            size="large"
                            onClick={() => navigate(-1)}
                        />
                        <div className={styles.headerRight}>
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
                    <h1 className={styles.title}>Уведомления</h1>
                </div>

                <div className={styles.content}>
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Сегодня</h2>
                        <div className={styles.notificationsList}>
                            <NotificationItem
                                categoryIcon={<WalletIcon />}
                                label="Почти достигнут лимит"
                                description="Вы приближаетесь к личному лимиту на категорию «Маркетплейсы». Осталось 1 070 ₽."
                                time="19:10"
                                isNew={true}
                                onDelete={() => handleDeleteNotification('1')}
                            />
                            <NotificationItem
                                categoryIcon={<StarIcon />}
                                label="Подбор авиабилетов"
                                description="Вы чаще покупаете билеты в конце месяца — хотите, напомню о лучших датах заранее?"
                                time="16:55"
                                isNew={false}
                                onDelete={() => handleDeleteNotification('2')}
                            />
                            <NotificationItem
                                categoryIcon={<QuestionIcon />}
                                label="Необычная покупка"
                                description="Эта трата не похожа на ваши обычные. Посмотреть, к какой категории её отнести?"
                                time="19:10"
                                isNew={false}
                                onDelete={() => handleDeleteNotification('3')}
                            />
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Вчера</h2>
                        <div className={styles.notificationsList}>
                            <NotificationItem
                                categoryIcon={<GraphIcon />}
                                label="Новый тренд"
                                description="Доставка стала дороже. Расходы на доставки выросли на 15% за две недели."
                                time="19:10"
                                isNew={false}
                                onDelete={() => handleDeleteNotification('4')}
                            />
                            <NotificationItem
                                categoryIcon={<ReceiptIcon />}
                                label="Обнаружена подписка"
                                description="Новое регулярное списание. Проверим, нужна ли она?"
                                time="16:55"
                                isNew={false}
                                onDelete={() => handleDeleteNotification('5')}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

