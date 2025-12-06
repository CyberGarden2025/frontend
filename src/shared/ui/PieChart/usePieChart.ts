import { useMemo, useState, useEffect } from 'react';
import type { Category } from './PieChart';

const getCategoryColor = (name: string): string => {
    const colorMap: Record<string, string> = {
        'Продукты': '#50B848',
        'Еда': '#50B848',
        'Food': '#50B848',
        'Ипотека': '#e6e6e6',
        'Rent': '#e6e6e6',
        'Аренда': '#e6e6e6',
        'Автотовары': '#cac3f5',
        'Детские товары': '#dfef8a',
        'Подписки и сервисы': '#81d2d4',
        'Разное': '#ffa500',
        'Misc': '#ffa500',
        'Транспорт': '#4a90e2',
        'Transport': '#4a90e2',
        'Покупки': '#ff6b9d',
        'Shopping': '#ff6b9d',
        'Зарплата': '#9b59b6',
        'Salary': '#9b59b6',
        'Пополнение': '#2ecc71',
        'deposit': '#2ecc71',
        'Снятие': '#e74c3c',
        'withdrawal': '#e74c3c',
        'Перевод': '#3498db',
        'transfer': '#3498db',
        'Платеж': '#f39c12',
        'payment': '#f39c12',
    };
    return colorMap[name] || '#cccccc';
};

const getCategoryIsStriped = (name: string): boolean => {
    const stripedCategories = ['Ипотека'];
    return stripedCategories.includes(name);
};

export const usePieChart = (
    categories: Category[],
    selectedCategoryIndex?: number
) => {
    const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | null>(null);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    useEffect(() => {
        if (selectedCategoryIndex !== undefined) {
            setActiveCategoryIndex(selectedCategoryIndex);
            setIsInitialLoad(false);
        } else {
            const maxValue = Math.max(...categories.map((c) => c.value));
            const maxValueIndex = categories.findIndex((c) => c.value === maxValue);
            const initialIndex = maxValueIndex >= 0 ? maxValueIndex : null;
            setActiveCategoryIndex(initialIndex);
            setIsInitialLoad(true);
            if (initialIndex !== null) {
                setTimeout(() => {
                    setIsInitialLoad(false);
                }, 2000);
            } else {
                setTimeout(() => {
                    setIsInitialLoad(false);
                }, 2000);
            }
        }
    }, [categories, selectedCategoryIndex]);

    const chartData = useMemo(() => {
        const maxValue = Math.max(...categories.map((c) => c.value));
        const maxValueIndex = categories.findIndex((c) => c.value === maxValue);
        const reorderedCategories = [
            ...categories.slice(maxValueIndex + 1),
            ...categories.slice(0, maxValueIndex + 1),
        ];
        return reorderedCategories.map((category) => {
            const originalIndex = categories.findIndex((c) => c.name === category.name);
            return {
                name: category.name,
                value: category.value,
                color: getCategoryColor(category.name),
                isStriped: getCategoryIsStriped(category.name),
                badgeValue: category.badgeValue,
                originalIndex,
            };
        });
    }, [categories]);

    const badgeCategoryIndex = useMemo(() => {
        if (activeCategoryIndex !== null && activeCategoryIndex >= 0 && activeCategoryIndex < categories.length) {
            const badgeData = chartData.find((item) => item.originalIndex === activeCategoryIndex);
            if (badgeData) {
                return chartData.indexOf(badgeData);
            }
            return -1;
        }
        return -1;
    }, [chartData, activeCategoryIndex, categories]);

    const badgeData = useMemo(() => {
        if (badgeCategoryIndex >= 0 && activeCategoryIndex !== null && badgeCategoryIndex < chartData.length) {
            const entry = chartData[badgeCategoryIndex];
            const activeCategory = categories[activeCategoryIndex];
            if (!entry || !activeCategory) {
                return null;
            }
            const total = chartData.reduce((sum, item) => sum + item.value, 0);
            if (total === 0) {
                return null;
            }
            const paddingAngle = 2;
            const totalPaddingAngle = paddingAngle * chartData.length;
            const availableAngle = 360 - totalPaddingAngle;
            
            let currentAngle = 0;
            for (let i = 0; i < badgeCategoryIndex; i++) {
                const segmentAngle = (chartData[i].value / total) * availableAngle;
                currentAngle += segmentAngle + paddingAngle;
            }
            const segmentAngle = (entry.value / total) * availableAngle;
            const midAngle = currentAngle + segmentAngle / 2;
            const radius = 81.5;
            const cx = 103;
            const cy = 103;
            const angleRad = ((midAngle - 90) * Math.PI) / 180;
            const x = cx + Math.cos(angleRad) * radius;
            const y = cy + Math.sin(angleRad) * radius;

            const badgeValue = activeCategory.badgeValue ?? activeCategory.value;

            const badgeSide: 'left' | 'right' = x >= cx ? 'right' : 'left';

            return { x, y, value: badgeValue, side: badgeSide };
        }
        return null;
    }, [chartData, badgeCategoryIndex, activeCategoryIndex, categories]);

    const handleCategoryClick = (index: number) => {
        if (index >= 0 && index < chartData.length) {
            const clickedEntry = chartData[index];
            if (clickedEntry && clickedEntry.originalIndex !== undefined && clickedEntry.originalIndex >= 0) {
                setActiveCategoryIndex(clickedEntry.originalIndex);
            }
        }
    };

    return {
        chartData,
        badgeData,
        isInitialLoad,
        activeCategoryIndex: activeCategoryIndex ?? null,
        handleCategoryClick,
        getCategoryColor,
        getCategoryIsStriped,
    };
};

