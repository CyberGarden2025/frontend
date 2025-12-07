// Dropdown.tsx
import React, { useState, useRef, useEffect } from 'react';
import cls from './Dropdown.module.scss';
import clsx from 'clsx';
import type { DropdownItem, DropdownProps } from './Dropdown.props';
import { ChevronIcon, CrossIcon } from '../icons';

// Type guard для проверки является ли значение массивом
const isArray = (value: unknown): value is unknown[] => Array.isArray(value);

export const Dropdown: React.FC<DropdownProps> = props => {
    const {
        className,
        items,
        placeholder = 'Select an option',
        disabled = false,
        label,
        error,
        required = false,
        multiple = false,
        maxSelected,
    } = props;

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Получаем значения в зависимости от режима
    const getSelectedValues = (): string[] => {
        if (multiple) {
            return isArray(props.value) ? props.value : [];
        } else {
            return typeof props.value === 'string' ? [props.value] : [];
        }
    };

    const selectedValues = getSelectedValues();
    const selectedItems = items.filter(item => selectedValues.includes(item.value));

    // Текст для отображения
    const displayText = selectedItems[0]?.label || placeholder;

    // Закрытие dropdown при клике вне его
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleToggle = () => {
        if (!disabled) setIsOpen(!isOpen);
    };

    const handleSelect = (item: DropdownItem) => {
        if (multiple) {
            const isSelected = selectedValues.includes(item.value);
            let newValues: string[];

            if (isSelected) {
                newValues = selectedValues.filter(v => v !== item.value);
            } else {
                if (maxSelected && selectedValues.length >= maxSelected) {
                    return;
                }
                newValues = [...selectedValues, item.value];
            }

            (props.onChange as (value: string[]) => void)(newValues);
        } else {
            (props.onChange as (value: string) => void)(item.value);
            setIsOpen(false);
        }
    };

    const isItemSelected = (itemValue: string) => selectedValues.includes(itemValue);
    const isMaxReached = maxSelected ? selectedValues.length >= maxSelected : false;

    return (
        <div className={clsx(cls.dropdownContainer, className)}>
            {label && (
                <label className={cls.label}>
                    {label}
                    {required && <span className={cls.required}>*</span>}
                </label>
            )}

            <div
                ref={dropdownRef}
                className={clsx(cls.dropdownWrapper, {
                    [cls.disabled]: disabled,
                    [cls.error]: error,
                    [cls.open]: isOpen,
                    [cls.multiple]: multiple,
                })}
            >
                <button
                    type="button"
                    className={cls.dropdownTrigger}
                    onClick={handleToggle}
                    disabled={disabled}
                >
                    <div className={cls.selectedContent}>
                        {multiple && selectedItems.length > 0 ? (
                            <div className={cls.selectedTags}>
                                <span className={cls.selectedValue}>
                                    Выбрано: {selectedItems.length}
                                </span>
                            </div>
                        ) : (
                            <span className={cls.selectedValue}>{displayText}</span>
                        )}
                    </div>
                    <ChevronIcon className={clsx(cls.chevron, { [cls.rotated]: isOpen })} />
                </button>

                {isOpen && (
                    <div className={cls.dropdownMenu}>
                        {items.length === 0 ? (
                            <div className={cls.noOptions}>No options</div>
                        ) : (
                            <>
                                {multiple && maxSelected && (
                                    <div className={cls.selectionLimit}>
                                        Selected: {selectedValues.length}/{maxSelected}
                                    </div>
                                )}
                                {items.map(item => {
                                    const selected = isItemSelected(item.value);
                                    const disabledByLimit = !selected && isMaxReached;

                                    return (
                                        <button
                                            key={item.value}
                                            type="button"
                                            className={clsx(cls.dropdownItem, {
                                                [cls.selected]: selected,
                                                [cls.disabledItem]: disabledByLimit,
                                            })}
                                            onClick={() => !disabledByLimit && handleSelect(item)}
                                            disabled={disabledByLimit}
                                        >
                                            {item.label}
                                            {selected && (
                                                <div className={cls.selectedIndicator}>
                                                    <CrossIcon className={cls.selectedIcon} />
                                                </div>
                                            )}
                                            {multiple &&
                                                maxSelected &&
                                                !selected &&
                                                isMaxReached && (
                                                    <span className={cls.limitMessage}>
                                                        Limit reached
                                                    </span>
                                                )}
                                        </button>
                                    );
                                })}
                            </>
                        )}
                    </div>
                )}
            </div>

            {error && <div className={cls.errorMessage}>{error}</div>}
        </div>
    );
};
