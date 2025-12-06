import clsx from 'clsx';
import { type FC, type ReactNode } from 'react';
import { IconButton } from '@shared/ui';
import { WalletIcon } from '@shared/ui/icons';
import styles from './TransactionCard.module.scss';

export interface TransactionCardProps {
    operationLabel: string;
    value: number;
    category?: string;
    icon?: ReactNode;
    onClick?: () => void;
    className?: string;
    style?: React.CSSProperties;
}

export const TransactionCard: FC<TransactionCardProps> = ({
    operationLabel,
    value,
    category,
    icon,
    onClick,
    className,
    style,
}) => {
    const formatAmount = (amount: number): string => {
        return Math.abs(amount).toLocaleString('ru-RU');
    };

    const valueFormatted = formatAmount(value);
    const isPositive = value >= 0;
    const amountPrefix = isPositive ? '+' : '–';

    return (
        <div
            className={clsx(styles.root, className)}
            style={style}
            onClick={onClick}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
        >
            <div className={styles.iconButtonContainer}>
                <IconButton
                    icon={icon || <WalletIcon />}
                    variant="secondary"
                    state="default"
                    size="medium"
                    badge={false}
                    className={clsx({
                        [styles.iconButtonPositive]: isPositive,
                        [styles.iconButtonNegative]: !isPositive,
                    })}
                />
            </div>

            <div className={styles.content}>
                <div className={styles.textContainer}>
                    {category && (
                        <p className={styles.category}>{category}</p>
                    )}
                    <p className={styles.operationLabel}>{operationLabel}</p>
                </div>
            </div>

            <div
                className={clsx(styles.amountContainer, {
                    [styles.amountContainerPositive]: isPositive,
                    [styles.amountContainerNegative]: !isPositive,
                })}
            >
                <div className={styles.amountValueWrapper}>
                    <p className={styles.amountPrefix}>{amountPrefix}</p>
                    <p className={styles.value}>{valueFormatted}</p>
                </div>
                <p className={styles.currency}>₽</p>
            </div>
        </div>
    );
};

