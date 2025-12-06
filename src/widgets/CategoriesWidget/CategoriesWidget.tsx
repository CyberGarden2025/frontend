import clsx from 'clsx';
import { type FC, type ReactNode, useEffect } from 'react';
import { PieChart, IconButton } from '@shared/ui';
import type { Category } from '@shared/ui';
import { useGetCategoriesMonthMutation } from '@shared/api';
import { getCategoryLabel } from '@shared/lib/utils/categoryLabels';
import styles from './CategoriesWidget.module.scss';

export interface CategoriesWidgetProps {
    title: string;
    subtitle?: string;
    categories?: Category[];
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

export const CategoriesWidget: FC<CategoriesWidgetProps> = ({
    title,
    subtitle: propSubtitle,
    categories: propCategories,
    leftIcon,
    rightIcons,
    className,
    style,
}) => {
    const [getCategoriesMonth, { data: categoriesData }] = useGetCategoriesMonthMutation();

    useEffect(() => {
        getCategoriesMonth({
            userId: 1,
            monthDate: '01/12/2023',
        });
    }, [getCategoriesMonth]);

    const categories: Category[] = categoriesData?.categories
        ? categoriesData.categories.map(cat => ({
              name: getCategoryLabel(cat.category),
              value: cat.percentage,
          }))
        : propCategories ?? [];

    const subtitle = categoriesData?.monthFull
        ? `за ${categoriesData.monthFull.toLowerCase()}`
        : propSubtitle ?? '';

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
                    <div className={styles.titleContainer}>
                        <h2 className={styles.title}>{title}</h2>
                        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                    </div>
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

            <div className={styles.chartContainer}>
                <PieChart categories={categories} />
            </div>
        </div>
    );
};

