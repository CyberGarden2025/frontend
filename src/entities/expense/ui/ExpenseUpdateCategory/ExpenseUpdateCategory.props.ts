import type { Dispatch, SetStateAction } from 'react';

export interface ExpenseUpdateCategoryProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    id: number;
}
