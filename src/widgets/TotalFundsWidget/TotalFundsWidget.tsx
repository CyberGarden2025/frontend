import { type FC } from 'react';
import clsx from 'clsx';
import { IconButton } from '@shared/ui';
import { MoreIcon, SettingsIcon, WalletIcon, ChatIcon, ExpandIcon, ArrowBackIcon } from '@shared/ui/icons';
import styles from './TotalFundsWidget.module.scss';

export interface TotalFundsWidgetProps {
    totalAmount: number;
    decimalAmount: number;
    monthsCovered: number;
    notificationCount?: number;
    className?: string;
    style?: React.CSSProperties;
}

export const TotalFundsWidget: FC<TotalFundsWidgetProps> = ({
    totalAmount,
    decimalAmount,
    monthsCovered,
    notificationCount = 0,
    className,
    style,
}) => {
    const formatAmount = (amount: number): string => {
        return new Intl.NumberFormat('ru-RU').format(amount);
    };

    const totalAmountStr = totalAmount.toString();
    const mainPart = totalAmountStr.length > 3 ? totalAmountStr.slice(0, -3) : totalAmountStr;
    const decimalPart = totalAmountStr.length > 3 ? totalAmountStr.slice(-3) : '';

    return (
        <div className={clsx(styles.root, className)} style={style}>
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <div className={styles.iconButtonWrapper}>
                        <IconButton
                            icon={<WalletIcon />}
                            variant="secondary"
                            state="default"
                            size="medium"
                        />
                    </div>
                    <h2 className={styles.title}>Всего средств</h2>
                </div>
                <div className={styles.headerRight}>
                    <div className={styles.iconButtonWithBadge}>
                        <IconButton
                            icon={<ChatIcon />}
                            variant="primary"
                            state="default"
                            size="medium"
                            badge={notificationCount > 0}
                            badgeValue={String(notificationCount)}
                        />
                    </div>
                    <div className={styles.iconButtonWrapper}>
                        <IconButton
                            icon={<div style={{transform: "rotate(135deg)"}}><ArrowBackIcon /></div>}
                            variant="primary"
                            state="default"
                            size="medium"
                        />
                    </div>
                </div>
            </div>

            <div className={styles.balanceContainer}>
                <div className={styles.balanceContent}>
                    <div className={styles.balanceValues}>
                        <div className={styles.balanceMain}>{mainPart}</div>
                        {decimalPart && <div className={styles.balanceDecimal}>{decimalPart}</div>}
                    </div>
                    <div className={styles.balanceCurrency}>₽</div>
                </div>
            </div>

            <div className={styles.progressContainer}>
                <div className={styles.progressBarContainer}>
                    <div className={styles.progressBarBackground}></div>
                    <div className={styles.progressBarDetails}>
                        <div className={styles.progressBarLabel}>
                            <div className={styles.progressPointer}>
                                <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 0L8 6H0L4 0Z" fill="currentColor"/>
                                </svg>
                            </div>
                            <div className={styles.progressIcon}>
                                <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 0L8.5 4.5L13 6L8.5 7.5L7 12L5.5 7.5L1 6L5.5 4.5L7 0Z" fill="currentColor"/>
                                </svg>
                            </div>
                            <p className={styles.progressText}>Вы в потоке!</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.summaryContainer}>
                <div className={styles.summaryIconWrapper}>
                    <div className={styles.summaryIcon}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 3L11 6.5L14.5 7.5L11 8.5L10 12L9 8.5L5.5 7.5L9 6.5L10 3Z" fill="white"/>
                            <path d="M3.5 8.5L4 10L5.5 10.5L4 11L3.5 12.5L3 11L1.5 10.5L3 10L3.5 8.5Z" fill="white"/>
                            <path d="M16.5 11.5L17 13L18.5 13.5L17 14L16.5 15.5L16 14L14.5 13.5L16 13L16.5 11.5Z" fill="white"/>
                            <path d="M6 2L6.5 3.5L8 4L6.5 4.5L6 6L5.5 4.5L4 4L5.5 3.5L6 2Z" fill="white"/>
                        </svg>
                    </div>
                </div>
                <p className={styles.summaryText}>
                    Хватит на {monthsCovered} {monthsCovered === 1 ? 'месяц' : monthsCovered < 5 ? 'месяца' : 'месяцев'} при Вашем  <br/>среднем уровне расходов
                </p>
            </div>
        </div>
    );
};

