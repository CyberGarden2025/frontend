import clsx from 'clsx';
import { type FC } from 'react';
import { getChartMonths, getMonthPeriod } from '@shared/lib/utils';
import styles from './Chart.module.scss';

interface ChartProps {
    values: [number, number, number, number, number, number, number];
    className?: string;
    style?: React.CSSProperties;
}

const getMaxValue = (values: number[]): number => {
    return Math.max(...values, 1);
};

export const Chart: FC<ChartProps> = ({ values, className, style }) => {
    const maxValue = getMaxValue(values);
    const chartMonths = getChartMonths();

    return (
        <div className={clsx(styles.root, className)} style={style}>
            {values.map((value, index) => {
                const period = getMonthPeriod(index);
                const height = value > 0 ? (value / maxValue) * 130 : 0;
                const isCurrent = period === 'current';

                return (
                    <div
                        key={index}
                        className={clsx(styles.column, {
                            [styles.columnPast]: period === 'past',
                            [styles.columnCurrent]: period === 'current',
                            [styles.columnFuture]: period === 'future',
                        })}
                    >
                        {isCurrent && (
                            <div className={styles.badgeContainer}>
                                <div className={styles.badgeCurrent}>
                                    <div className={styles.badgeCurrentInner}>
                                        <span className={styles.badgeValue}>{value}</span>
                                    </div>
                                    <div className={styles.badgeCurrentDot} />
                                </div>
                            </div>
                        )}
                        <div className={styles.barContainer}>
                            <div
                                className={clsx(styles.bar, {
                                    [styles.barPast]: period === 'past',
                                    [styles.barCurrent]: period === 'current',
                                    [styles.barFuture]: period === 'future',
                                })}
                                style={{ height: `${height}%` }}
                            >
                                {!isCurrent && (
                                    <div className={styles.badgeContainer}>
                                        <div
                                            className={clsx(styles.badge, {
                                                [styles.badgePast]: period === 'past',
                                                [styles.badgeFuture]: period === 'future',
                                            })}
                                        />
                                    </div>
                                )}
                            </div>
                            <p
                                className={clsx(styles.monthLabel, {
                                    [styles.monthLabelPast]: period === 'past',
                                    [styles.monthLabelCurrent]: period === 'current',
                                    [styles.monthLabelFuture]: period === 'future',
                                })}
                            >
                                {chartMonths[index]}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

