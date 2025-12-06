import type { Dispatch, SetStateAction } from "react";

export interface ExpenseAddModalProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>
}