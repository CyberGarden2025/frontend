export type MonthPeriod = 'past' | 'current' | 'future';

export const ALL_MONTHS = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'] as const;

export type MonthName = (typeof ALL_MONTHS)[number];

export interface MonthInfo {
    index: number;
    name: MonthName;
    period: MonthPeriod;
    realMonth: number;
}

export const getCurrentRealMonth = (): number => {
    return new Date().getMonth();
};

export const getChartMonths = (): MonthName[] => {
    const currentMonth = getCurrentRealMonth();
    const months: MonthName[] = [];
    
    for (let i = -4; i <= 2; i++) {
        let monthIndex = currentMonth + i;
        if (monthIndex < 0) {
            monthIndex += 12;
        } else if (monthIndex >= 12) {
            monthIndex -= 12;
        }
        months.push(ALL_MONTHS[monthIndex]);
    }
    
    return months;
};

export const getCurrentMonthIndex = (): number => {
    return 4;
};

export const getMonthPeriod = (chartIndex: number): MonthPeriod => {
    if (chartIndex < 4) return 'past';
    if (chartIndex === 4) return 'current';
    return 'future';
};

export const getChartMonthsInfo = (): MonthInfo[] => {
    const chartMonths = getChartMonths();
    const currentRealMonth = getCurrentRealMonth();
    
    return chartMonths.map((name, index) => {
        const allMonthsIndex = ALL_MONTHS.indexOf(name);
        const realMonth = allMonthsIndex;
        
        return {
            index,
            name,
            period: getMonthPeriod(index),
            realMonth,
        };
    });
};

export const getPastMonths = (): MonthInfo[] => {
    return getChartMonthsInfo().filter((month) => month.period === 'past');
};

export const getCurrentMonth = (): MonthInfo | null => {
    const months = getChartMonthsInfo();
    return months.find((month) => month.period === 'current') ?? null;
};

export const getFutureMonths = (): MonthInfo[] => {
    return getChartMonthsInfo().filter((month) => month.period === 'future');
};

