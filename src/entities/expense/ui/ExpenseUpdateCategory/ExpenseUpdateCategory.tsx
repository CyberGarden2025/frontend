import { useEffect, useRef, useState, type FC } from 'react';
import type { ExpenseUpdateCategoryProps } from './ExpenseUpdateCategory.props';
import cls from './ExpenseUpdateCategory.module.scss';
import { Button, Dropdown } from '@shared/ui';
import { readableCategory } from '@entities/expense/lib';
import type { ExpenseType } from '@entities/expense';
import { useUpdateCategoryMutation } from '@entities/expense/api';

export const ExpenseUpdateCategory: FC<ExpenseUpdateCategoryProps> = ({
    isOpen,
    id,
    setIsOpen,
}) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const [category, setCategory] = useState<ExpenseType>();

    const [trigger] = useUpdateCategoryMutation();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === wrapperRef.current) {
            setIsOpen(false);
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div ref={wrapperRef} className={cls.container} onClick={handleContainerClick}>
            <div ref={modalRef} className={cls.wrapper} onClick={e => e.stopPropagation()}>
                <h1 className={cls.title}>Обновление категории транзакции</h1>
                <Dropdown
                    placeholder="Выберите категорию"
                    items={Object.keys(readableCategory).map(item => ({
                        label: readableCategory[item],
                        value: item,
                    }))}
                    value={category}
                    onChange={val => setCategory(val)}
                />
                <Button label="Обновить" onClick={() => trigger({ id, category })} />
            </div>
        </div>
    );
};
