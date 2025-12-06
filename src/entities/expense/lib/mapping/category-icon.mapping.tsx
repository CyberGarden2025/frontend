import type { ExpenseType } from "@entities/expense/type";
import { SalaryIcon, ShoppingIcon } from "@shared/ui/icons";
import type { ReactNode } from "react";

export const categoryIconMapping: Record<ExpenseType, ReactNode> = {
    'Food': <ShoppingIcon/>,
    'Misc': <ShoppingIcon/>,
    'Rent': <ShoppingIcon/>,
    'Salary': <SalaryIcon/>,
    'Shopping': <ShoppingIcon/>,
    'Transport': <ShoppingIcon/>,
}