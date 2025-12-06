import { useEffect, useRef, useState, type FC } from "react"
import type { ExpenseAddModalProps } from "./ExpenseAddModal.props"
import cls from "./ExpenseAddModal.module.scss"
import clsx from "clsx"
import { ExpenseAddForm } from "../ExpenseAddForm"


export const ExpenseAddModal: FC<ExpenseAddModalProps> = ({isOpen, setIsOpen}) => {
    const [activeTab, setActiveTab] = useState<0 | 1>(0)
    const wrapperRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
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
            <div ref={modalRef} className={cls.wrapper} onClick={(e) => e.stopPropagation()}>
                <h1 className={cls.title}>
                    Добавление новой операции
                </h1>
                <div className={cls.operationType}>
                    <button
                    onClick={() => {
                        setActiveTab(0)
                    }}
                    className={clsx(cls.button, {
                        [cls.active]: activeTab === 0
                    })}>Поступление</button>
                    <button
                    onClick={() => {
                        setActiveTab(1)
                    }}
                    className={clsx(cls.button, {
                        [cls.active]: activeTab === 1
                    })}
                    >Расход</button>
                </div>
                <ExpenseAddForm onFinish={() => setIsOpen(false)} type={activeTab}/>
            </div>
        </div>
    )
}