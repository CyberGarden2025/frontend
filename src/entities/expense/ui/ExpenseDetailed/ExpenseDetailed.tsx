import type { FC } from "react";
import cls from "./ExpenseDetailed.module.scss"
import type { ExpenseDetailedProps } from "./ExpenseDetailed.props";
import { CardIcon, EditIcon } from "@shared/ui/icons";
import clsx from "clsx"
import { categoryIconMapping, readableCategory } from "@entities/expense/lib";
import { Button } from "@shared/ui";


export const ExpenseDetailed: FC<ExpenseDetailedProps> = ({transaction}) => {
    return (
        <div className={cls.wrapper}>
            <div className={cls.card}>
                <p className={cls.text}>{transaction.sum > 0 ? "Пополнение на счет" : "Списание с счета"}</p>
                <div className={cls.cardIcon}>
                    <CardIcon/>
                    <p className={cls.cardIconText}>
                        *0920
                    </p>
                </div>
            </div>

            <div className={clsx(cls.card, cls.sumCard)}>
               <div className={cls.row}>
                    <div className={cls.textCol}>
                        <h3 className={cls.subTitle}>
                            Неизвестно
                        </h3>
                        <p className={cls.category}>
                            {readableCategory[transaction.category]}
                        </p>
                    </div>
                    <div className={cls.iconCol}>
                        <div className={cls.icon}>
                            {categoryIconMapping[transaction.category]}
                        </div>
                        <h2 className={clsx(cls.sum, {
                            [cls.increase]: transaction.sum > 0,
                            [cls.decrease]: transaction.sum < 0,
                        })}>
                            {transaction.sum > 0 && "+"}{transaction.sum} ₽ 
                        </h2>
                    </div>
               </div>
            </div>
            <div className={cls.actions}>
                <Button label={(
                    <div className={cls.buttonContent}>
                        <p className={clsx(cls.actionText, cls.warning)}>
                            Удалить
                        </p>
                    </div>
                )}/>
                <Button label={(
                    <div className={cls.buttonContent}>
                        <EditIcon/>
                        <p className={cls.actionText}>
                            Категория
                        </p>
                    </div>
                )}/>

            </div>
        </div>
    );
};