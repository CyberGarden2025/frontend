import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import cls from "./ExpenseDetailed.module.scss"
import type { ExpenseDetailedProps } from "./ExpenseDetailed.props";
import { CardIcon, EditIcon, ReceiptIcon, ScanIcon } from "@shared/ui/icons";
import clsx from "clsx"
import { categoryIconMapping, readableCategory } from "@entities/expense/lib";
import { Button } from "@shared/ui";
import { useDeleteTransactionMutation } from "@shared/api";


export const ExpenseDetailed: FC<ExpenseDetailedProps> = ({transaction, transactionId, onDelete}) => {
    const navigate = useNavigate();
    const [deleteTransaction, { isLoading: isDeleting }] = useDeleteTransactionMutation();

    const handleScanClick = () => {
        navigate('/scan-receipt');
    };

    const handleDelete = async () => {
        if (!transactionId) {
            return;
        }

        try {
            await deleteTransaction({
                id: transactionId,
                category: transaction.category,
            }).unwrap();
            
            if (onDelete) {
                onDelete();
            } else {
                navigate('/operations');
            }
        } catch (error) {
            console.error('Ошибка при удалении транзакции:', error);
        }
    };

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
                <Button 
                    label={(
                        <div className={cls.buttonContent}>
                            <p className={clsx(cls.actionText, cls.warning)}>
                                Удалить
                            </p>
                        </div>
                    )}
                    onClick={handleDelete}
                    disabled={isDeleting || !transactionId}
                />
                <Button label={(
                    <div className={cls.buttonContent}>
                        <EditIcon/>
                        <p className={cls.actionText}>
                            Категория
                        </p>
                    </div>
                )}/>

            </div>

            <div className={clsx(cls.card, cls.scan)}>
                <div className={cls.col}>
                    <h3 className={cls.title}>Отсканируйте чек</h3>
                    <p className={cls.text}>
                    сохраните информацию о покупке
                    </p>
                    <div className={cls.icon} onClick={handleScanClick} style={{ cursor: 'pointer' }}>
                        <ScanIcon/>
                    </div>
                    <img className={cls.img} src="/scan.webp" alt="" />
                </div>
            </div>
            <div className={clsx(cls.card, cls.purchases)}>
                <div className={cls.heading}>
                    <h4 className={cls.title}>Список покупок</h4>
                    <div className={cls.icon}>
                        <ReceiptIcon/>
                    </div>
                </div>
                {transaction?.purchases && <ul className={cls.list}>
                        {transaction.purchases.map((item) => (
                            <li className={cls.item}>
                                <p className={cls.name}>
                                    {item.name}
                                </p>
                                <p className={cls.count}>
                                    {item.count}кг
                                </p>
                                <p className={cls.price}>
                                    {item.price} ₽
                                </p>
                            </li>
                        ))}
                    </ul>
                    }
            </div>
            <div className={clsx(cls.card, cls.details)}>
                <div className={cls.heading}>
                    <h4 className={cls.title}>Реквизиты транзакции</h4>
                </div>
                <div className={cls.detailsWrapper}>
                    <p className={cls.text}>
                        Идентификатор операции
                    </p>
                    <h5 className={cls.subTitle}>
                        {transaction.refNo}
                    </h5>   
                </div>
            </div>
        </div>
    );
};