import { useAppDispatch } from '@shared/hooks';
import { updateFiltersPeriod } from '../model/expenseSlice';
import type { ExpenseFiltersDate } from '../interface';

export const useSelectExpenseFiltersPerios = () => {
    const dispatch = useAppDispatch();

    const setWeek = () => {
        const now = new Date();
        const dayOfWeek = now.getDay();
        const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Понедельник
        const start = new Date(now.setDate(diff));
        start.setHours(0, 0, 0, 0);
        
        const end = new Date(start);
        end.setDate(start.getDate() + 6); // Воскресенье
        end.setHours(23, 59, 59, 999);

        const period: ExpenseFiltersDate = { start, end };
        dispatch(updateFiltersPeriod(period));
    };

    const setMonth = () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth(), 1);
        start.setHours(0, 0, 0, 0);
        
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        end.setHours(23, 59, 59, 999);

        const period: ExpenseFiltersDate = { start, end };
        dispatch(updateFiltersPeriod(period));
    };

    const setThreeMonths = () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth() - 2, 1);
        start.setHours(0, 0, 0, 0);
        
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        end.setHours(23, 59, 59, 999);

        const period: ExpenseFiltersDate = { start, end };
        dispatch(updateFiltersPeriod(period));
    };

    const setHalfYear = () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth() - 5, 1);
        start.setHours(0, 0, 0, 0);
        
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        end.setHours(23, 59, 59, 999);

        const period: ExpenseFiltersDate = { start, end };
        dispatch(updateFiltersPeriod(period));
    };

    const setYear = () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth() - 11, 1);
        start.setHours(0, 0, 0, 0);
        
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        end.setHours(23, 59, 59, 999);

        const period: ExpenseFiltersDate = { start, end };
        dispatch(updateFiltersPeriod(period));
    };

    const setCustomDate = (startDate: Date, endDate: Date) => {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);

        const period: ExpenseFiltersDate = { start, end };
        dispatch(updateFiltersPeriod(period));
    };

    return {
        setWeek,
        setMonth,
        setThreeMonths,
        setHalfYear,
        setYear,
        setCustomDate,
    };
};