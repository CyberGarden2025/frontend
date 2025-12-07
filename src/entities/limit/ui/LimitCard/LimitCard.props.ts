import type { ExpenseType } from "@entities/expense";

export interface LimitCardProps {
    category: ExpenseType
    name: string;
    income: number;
    expense: number 
    color?: string; 
    id: number
}