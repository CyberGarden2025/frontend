import type { Dispatch, SetStateAction } from "react";

export interface ExpenseFiltersCustomDateProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>
}