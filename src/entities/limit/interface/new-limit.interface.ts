import type { ExpenseType } from '@entities/expense';
import type { LimitIcon } from '../type';

export interface NewLimit {
    name: string;
    icon: LimitIcon;
    description?: string;
    limit: string;
    period: string;
    categories: ExpenseType[];
}
