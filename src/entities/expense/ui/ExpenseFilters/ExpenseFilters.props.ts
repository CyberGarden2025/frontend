import type { Dispatch, SetStateAction } from "react";

export interface ExpenseFiltersProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>
}