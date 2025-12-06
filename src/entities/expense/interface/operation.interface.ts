import type { ExpenseType } from "../type";

export interface Operation {
    category: ExpenseType;
    sum: number;
    refNo: string;
    transactionDate: Date
}