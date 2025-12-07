import clsx from 'clsx';
import { type FC, type ReactNode, useEffect } from 'react';
import { Chart, IconButton } from '@shared/ui';
import { useGetExpensesChartMutation } from '@shared/api';
import styles from './ExpensesWidget.module.scss';
import { useKeycloak } from '@react-keycloak/web';

export interface ExpensesWidgetProps {
    monthlyAmount?: number;
    monthLabel?: string;
    chartValues?: [number, number, number, number, number, number, number];
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
    monthlyAmount: propMonthlyAmount,
    monthLabel: propMonthLabel,
    chartValues: propChartValues,
    leftIcon,
    rightIcons,
    className,
    style,
}) => {
    const [getExpensesChart, { data: expensesData, isLoading }] = useGetExpensesChartMutation();
    const { keycloak } = useKeycloak();
    const isAuthed = keycloak?.authenticated;

    useEffect(() => {
        if (!isAuthed) return;
        getExpensesChart({
            startDate: '01/12/2023',
        });
    }, [getExpensesChart, isAuthed]);

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

    const monthlyAmount = expensesData?.currentMonthExpenses ?? propMonthlyAmount ?? 0;
    const monthLabel = expensesData?.months?.[0] 
        ? `за ${expensesData.months[0].monthFull.toLowerCase()}` 
        : propMonthLabel ?? '';
    
    const getChartValues = (): [number, number, number, number, number, number, number] => {
        if (expensesData?.months) {
            const amounts = expensesData.months.slice(0, 7).map(m => m.amount);
            while (amounts.length < 7) {
                amounts.push(0);
            }
            return amounts as [number, number, number, number, number, number, number];
        }
        return propChartValues ?? [0, 0, 0, 0, 0, 0, 0];
    };
    
    const chartValues = getChartValues();

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
