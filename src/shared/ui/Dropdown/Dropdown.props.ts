// Dropdown.props.ts
export interface DropdownItem {
    label: string;
    value: string;
}

// Базовые пропсы для single select
interface DropdownBaseProps {
    className?: string;
    items: DropdownItem[];
    placeholder?: string;
    disabled?: boolean;
    label?: string;
    error?: string;
    required?: boolean;
}

// Single select props
export interface DropdownSingleProps extends DropdownBaseProps {
    multiple?: false;
    value?: string;
    onChange: (value: string) => void;
    maxSelected?: never; // Нельзя использовать с single select
}

// Multi select props
export interface DropdownMultiProps extends DropdownBaseProps {
    multiple: true;
    value?: string[];
    onChange: (value: string[]) => void;
    maxSelected?: number;
}

// Объединенный тип
export type DropdownProps = DropdownSingleProps | DropdownMultiProps;
