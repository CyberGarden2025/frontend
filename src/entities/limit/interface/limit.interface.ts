import type { ExpenseType } from '@entities/expense';
import type { LimitIcon } from '../type';

export interface Limit {
    name: string;
    icon: LimitIcon;
    description?: string;
    limit: number;
    spent: number;
    period: string;
    categories: ExpenseType[];
}
