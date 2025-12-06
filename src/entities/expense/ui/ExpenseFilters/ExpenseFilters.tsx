import { type FC, useRef, useEffect, useState } from 'react';
import styles from './ExpenseFilters.module.scss';
import type { ExpenseFiltersProps } from './ExpenseFilters.props';
import { Button, IconButton } from '@shared/ui';
import { CalendarIcon } from '@shared/ui/icons';
import { useSelectExpenseFiltersPerios } from '@entities/expense/hooks';
import { ExpenseFiltersCustomDate } from '../ExpenseFiltersCustomDate';

export const ExpenseFilters: FC<ExpenseFiltersProps> = ({isOpen, setIsOpen}) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const {setCustomDate, setHalfYear, setMonth, setThreeMonths, setWeek, setYear} = useSelectExpenseFiltersPerios();

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

    return (
        <>
            {isOpen && (
                <div 
                    className={styles.overlay}
                    onClick={() => setIsOpen(false)}
                />
            )}
            <div ref={wrapperRef} className={styles.wrapper}>
                {isOpen && (
                    <div ref={modalRef} className={styles.modal}>
                        <div className={styles.modalContent}>
                            <div className={styles.buttonWrapper}>
                                <Button 
                                    label="Неделя" 
                                    variant="primary"
                                    state="default"
                                    size="medium"
                                    onClick={() => {
                                        setWeek();
                                        setIsOpen(false);
                                    }}
                                />
                                <Button 
                                    label="Месяц" 
                                    variant="primary"
                                    state="default"
                                    size="medium"
                                    onClick={() => {
                                        setMonth();
                                        setIsOpen(false);
                                    }}
                                />
                                <Button 
                                    label="3 месяца" 
                                    variant="primary"
                                    state="default"
                                    size="medium"
                                    onClick={() => {
                                        setThreeMonths();
                                        setIsOpen(false);
                                    }}
                                />
                                <Button 
                                    label="Полгода" 
                                    variant="primary"
                                    state="default"
                                    size="medium"
                                    onClick={() => {
                                        setHalfYear();
                                        setIsOpen(false);
                                    }}
                                />
                                <Button 
                                    label="Год" 
                                    variant="primary"
                                    state="default"
                                    size="medium"
                                    onClick={() => {
                                        setYear();
                                        setIsOpen(false);
                                    }}
                                />
                                <IconButton
                                    icon={<CalendarIcon />}
                                    variant="primary"
                                    state="default"
                                    size="medium"
                                    onClick={() => {
                                        setModalOpen(true);
                                        setIsOpen(false);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <ExpenseFiltersCustomDate isOpen={modalOpen} setIsOpen={setModalOpen}/>
        </>  
    );
};