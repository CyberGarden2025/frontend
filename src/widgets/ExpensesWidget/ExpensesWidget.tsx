import clsx from 'clsx';
import { type FC, type ReactNode } from 'react';
import { Chart, IconButton } from '@shared/ui';
import styles from './ExpensesWidget.module.scss';

export interface ExpensesWidgetProps {
    monthlyAmount: number;
    monthLabel: string;
    chartValues: [number, number, number, number, number, number, number];
    leftIcon?: ReactNode;
    rightIcons?: Array<{
        icon: ReactNode;
        badge?: boolean;
        badgeValue?: string;
        onClick?: () => void;
    }>;
    className?: string;
    style?: React.CSSProperties;
}

export const ExpensesWidget: FC<ExpensesWidgetProps> = ({
    monthlyAmount,
    monthLabel,
    chartValues,
    leftIcon,
    rightIcons,
    className,
    style,
}) => {
    const formatAmount = (amount: number): { thousands: string; hundreds: string } => {
        const amountStr = amount.toString();
        if (amountStr.length <= 3) {
            return {
                thousands: amountStr,
                hundreds: '',
            };
        }
        const thousands = amountStr.slice(0, -3);
        const hundreds = amountStr.slice(-3);
        return { thousands, hundreds };
    };

    const { thousands, hundreds } = formatAmount(monthlyAmount);

    return (
        <div className={clsx(styles.root, className)} style={style}>
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    {leftIcon && (
                        <div className={styles.leftIconContainer}>
                            <IconButton
                                icon={leftIcon}
                                variant="secondary"
                                state="default"
                                size="medium"
                                badge={false}
                            />
                        </div>
                    )}
                    <h2 className={styles.title}>Расходы</h2>
                </div>
                {rightIcons && rightIcons.length > 0 && (
                    <div className={styles.headerRight}>
                        {rightIcons.map((iconConfig, index) => (
                            <IconButton
                                key={index}
                                icon={iconConfig.icon}
                                variant="primary"
                                state="default"
                                size="medium"
                                badge={iconConfig.badge}
                                badgeValue={iconConfig.badgeValue}
                                onClick={iconConfig.onClick}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className={styles.amountSection}>
                <div className={styles.amountContainer}>
                    <div className={styles.amountThousands}>{thousands}</div>
                    {hundreds && <div className={styles.amountHundreds}>{hundreds}</div>}
                </div>
                <div className={styles.monthLabel}>{monthLabel}</div>
            </div>

            <div className={styles.chartContainer}>
                <Chart values={chartValues} className={styles.chart} />
            </div>
        </div>
    );
};

