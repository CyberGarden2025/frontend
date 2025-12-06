import { useEffect, useRef, type FC, useState } from "react";
import cls from "./ExpenseFiltersCustomDate.module.scss"
import type { ExpenseFiltersCustomDateProps } from "./ExpenseFiltersCustomDate.props";
import { CalendarIcon } from "@shared/ui/icons";


export const ExpenseFiltersCustomDate: FC<ExpenseFiltersCustomDateProps> = ({isOpen, setIsOpen}) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const [startDate, setStartDate] = useState<string>("12.05.2022");
    const [endDate, setEndDate] = useState<string>("12.03.2025");

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isOpen &&
                modalRef.current &&
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
            <div ref={modalRef} className={cls.wrapper} onClick={(e) => e.stopPropagation()}>
                <h1 className={cls.title}>
                    Выберите период
                </h1>
                <div className={cls.dateList}>
                    <div className={cls.dateField}>
                        <p className={cls.label}>
                            Начало:
                        </p>
                        <div className={cls.inputWrapper}>
                            <div className={cls.iconWrapper}>
                                <CalendarIcon />
                            </div>
                            <input
                                type="text"
                                className={cls.dateInput}
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                placeholder="дд.мм.гггг"
                            />
                        </div>
                    </div>
                    <div className={cls.dateField}>
                        <p className={cls.label}>
                            Конец:
                        </p>
                        <div className={cls.inputWrapper}>
                            <div className={cls.iconWrapper}>
                                <CalendarIcon />
                            </div>
                            <input
                                type="text"
                                className={cls.dateInput}
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                placeholder="дд.мм.гггг"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}