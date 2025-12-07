import type { Operation } from "@entities/expense/interface/operation.interface";

export interface ExpenseDetailedProps {
    transaction: Operation;
    transactionId?: number;
    onDelete?: () => void;
}