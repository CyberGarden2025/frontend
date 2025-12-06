import { type FC, useRef, useEffect, useState } from 'react';
import styles from './ExpenseFilters.module.scss';
import type { ExpenseFiltersProps } from './ExpenseFilters.props';
import { Button, IconButton } from '@shared/ui';
import { MoreIcon } from '@shared/ui/icons/MoreIcon/MoreIcon';
import { useAppDispatch } from '@shared/hooks';
import { useSelectExpenseFiltersPerios } from '@entities/expense/hooks';
import { ExpenseFiltersCustomDate } from '../ExpenseFiltersCustomDate';

export const ExpenseFilters: FC<ExpenseFiltersProps> = ({isOpen, setIsOpen}) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const [expanded, setExpanded] = useState<boolean>(false)
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const {setCustomDate, setHalfYear,setMonth, setThreeMonths, setWeek, setYear} = useSelectExpenseFiltersPerios()



    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isOpen &&
                wrapperRef.current &&
                modalRef.current &&
                !wrapperRef.current.contains(event.target as Node) &&
                !modalRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, setIsOpen]);

    return (
        <div ref={wrapperRef} className={styles.wrapper}>
            {isOpen && (
                <div ref={modalRef} className={styles.modal}>
                    <div className={styles.modalContent}>
                        <div className={styles.buttonWrapper}>
                            <Button label={'Неделя'}/>
                            <Button label={'Месяц'}/>
                            <Button label={'3 месяца'}/>
                            {!expanded && <IconButton onClick={() => setExpanded(true)} icon={<MoreIcon/>}/>}
                        </div>
                       {expanded &&
                            <div className={styles.buttonWrapper}>
                                <Button label={'Полгода'}/>
                                <Button label={'Год'}/>
                                <Button onClick={() => {
                                    setModalOpen(true)
                                }} label={'Выбрать д...'}/>
                            </div>
                        }
                    </div>
                </div>
            )}
            <ExpenseFiltersCustomDate isOpen={modalOpen} setIsOpen={setModalOpen}/>
        </div>  
    );
};