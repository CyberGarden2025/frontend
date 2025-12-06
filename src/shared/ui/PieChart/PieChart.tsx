import clsx from 'clsx';
import { type FC } from 'react';
import { PieChart as RechartsPieChart, Pie, Cell } from 'recharts';
import { ChartColumnValueBadge } from '@shared/ui';
import { usePieChart } from './usePieChart';
import styles from './PieChart.module.scss';

export interface Category {
    name: string;
    value: number;
    badgeValue?: number;
}

export interface PieChartProps {
    categories: Category[];
    selectedCategoryIndex?: number;
    className?: string;
    style?: React.CSSProperties;
}

export const PieChart: FC<PieChartProps> = ({
    categories,
    selectedCategoryIndex,
    className,
    style,
}) => {
    const {
        chartData,
        badgeData,
        isInitialLoad,
        activeCategoryIndex,
        handleCategoryClick,
        getCategoryColor,
        getCategoryIsStriped,
    } = usePieChart(categories, selectedCategoryIndex);

    const chartSize = 206;

    return (
        <div className={clsx(styles.root, className)} style={style}>
            <div className={styles.chartWrapper}>
                <RechartsPieChart width={chartSize} height={chartSize} style={{ outline: 'none' }}>
                    <defs>
                        {chartData.map((entry, index) => {
                            if (entry.isStriped) {
                                return (
                                    <pattern
                                        key={`pattern-${index}`}
                                        id={`striped-${index}`}
                                        patternUnits="userSpaceOnUse"
                                        width="14"
                                        height="8"
                                    >
                                        <rect width="8" height="14" fill="#d9d9d9" />
                                        <rect width="8" height="8" x="4" fill="#ffffff" />
                                    </pattern>
                                );
                            }
                            return null;
                        })}
                    </defs>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={103}
                        paddingAngle={2}
                        dataKey="value"
                        stroke="none"
                        cornerRadius={8}
                        startAngle={90}
                        endAngle={-270}
                        onClick={(data: any, index: number) => {
                            if (data && typeof index === 'number') {
                                handleCategoryClick(index);
                            }
                        }}
                        style={{ cursor: 'pointer', outline: 'none' }}
                        activeShape={null}
                    >
                        {chartData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={entry.isStriped ? `url(#striped-${index})` : entry.color}
                                className={clsx(styles.cell, {
                                    [styles.cellStriped]: entry.isStriped,
                                })}
                            />
                        ))}
                    </Pie>
                </RechartsPieChart>
                {badgeData && !isInitialLoad && (
                    <div
                        key={`badge-${activeCategoryIndex}`}
                        className={styles.badgeWrapper}
                        style={{
                            left: `${badgeData.x}px`,
                            top: `${badgeData.y}px`,
                        }}
                    >
                        <ChartColumnValueBadge
                            value={badgeData.value}
                            expand={true}
                            type="default"
                            side={badgeData.side}
                        />
                    </div>
                )}
            </div>

            <div className={styles.legend}>
                {categories.map((category, index) => {
                    const categoryColor = getCategoryColor(category.name);
                    const categoryIsStriped = getCategoryIsStriped(category.name);
                    return (
                        <div key={index} className={styles.legendItem}>
                            <div
                                className={clsx(styles.legendIndicator, {
                                    [styles.legendIndicatorStriped]: categoryIsStriped,
                                })}
                                style={{
                                    backgroundColor: categoryIsStriped ? undefined : categoryColor,
                                    backgroundImage: categoryIsStriped
                                        ? `repeating-linear-gradient(
                                            45deg,
                                            #e6e6e6,
                                            #e6e6e6 2px,
                                            #d9d9d9 2px,
                                            #d9d9d9 4px
                                        )`
                                        : undefined,
                                }}
                            />
                            <span className={styles.legendLabel}>{category.name}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
