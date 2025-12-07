import { type FC, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OperationsWidget, TransactionsListWidget } from '@widgets';
import { IconButton, Button } from '@shared/ui';
import type { Transaction } from '@widgets';
import { useGetTransactionsQuery, useGetTransactionsTotalQuery } from '@shared/api/transactionsApi';
import {
    ArrowBackIcon,
    SearchIcon,
    MoreIcon,
    ExpandIcon,
    FilterIcon,
    WalletIcon,
} from '@shared/ui/icons';
import styles from './OperationsPage.module.scss';
import { ExpenseAddModal } from '@entities/expense';
import { useKeycloak } from '@react-keycloak/web';

const categoryLabels: Record<string, string> = {
    Food: 'Еда',
    Misc: 'Разное',
    Rent: 'Аренда',
    Salary: 'Зарплата',
    Shopping: 'Покупки',
    Transport: 'Транспорт',
    deposit: 'Пополнение',
    withdrawal: 'Снятие',
    transfer: 'Перевод',
    payment: 'Платеж',
};

const getCategoryLabel = (category: string): string => {
    return categoryLabels[category] || category;
};

const getOperationLabel = (category: string): string => {
    const labels: Record<string, string> = {
        Food: 'Покупка продуктов',
        Misc: 'Прочие расходы',
        Rent: 'Оплата аренды',
        Salary: 'Получение зарплаты',
        Shopping: 'Покупки',
        Transport: 'Транспорт',
        deposit: 'Пополнение счета',
        withdrawal: 'Снятие средств',
        transfer: 'Перевод между счетами',
        payment: 'Оплата',
    };
    return labels[category] || 'Операция';
};

export const OperationsPage: FC = () => {
    const navigate = useNavigate();
    const { keycloak } = useKeycloak();
    const [addModalOpen, setAddModalOpen] = useState<boolean>(false)
    const isAuthed = keycloak?.authenticated;
    const { data: backendTransactions, isLoading, error } = useGetTransactionsQuery(null, {
        skip: !isAuthed,
    });
    
    const { data: totalData } = useGetTransactionsTotalQuery(
        {
            start: '2023-08-01',
            end: '2023-08-31',
        },
        { skip: !isAuthed },
    );

    const transactions: Transaction[] = useMemo(() => {
        if (!backendTransactions) {
            return [];
        }

        return backendTransactions.flatMap((dayGroup) =>
            dayGroup.transaction.map((transaction) => ({
                id: transaction.id,
                operationLabel: getOperationLabel(transaction.category),
                value: transaction.sum,
                category: getCategoryLabel(transaction.category),
                date: dayGroup.date,
                icon: <WalletIcon />,
            }))
        );
    }, [backendTransactions]);

    return (
        <div className={styles.root}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.headerTop}>
                        <IconButton
                            icon={<ArrowBackIcon />}
                            variant="primary"
                            state="default"
                            size="large"
                            onClick={() => navigate(-1)}
                        />
                        <div className={styles.headerTopRight}>
                            <IconButton
                                icon={<SearchIcon />}
                                variant="primary"
                                state="default"
                                size="large"
                            />
                            <IconButton
                                icon={<MoreIcon />}
                                variant="primary"
                                state="default"
                                size="large"
                            />
                        </div>
                    </div>

                    <h1 className={styles.title}>Операции</h1>
                </div>

                <div className={styles.content}>
                    <div className={styles.filtersRow}>
                        <div className={styles.filtersLeft}>
                            <Button
                                label="Добавить операцию"
                                variant="primary"
                                state="default"
                                size="medium"
                                icon={<ExpandIcon />}
                                showIcon={true}
                                onClick={() => setAddModalOpen(true)}
                            />
                            <Button
                                label="Месяц"
                                variant="primary"
                                state="default"
                                size="medium"
                                icon={<ExpandIcon />}
                                showIcon={true}
                            />
                            <Button
                                label="Счета и карты"
                                variant="primary"
                                state="default"
                                size="medium"
                                icon={<ExpandIcon />}
                                showIcon={true}
                            />
                        </div>
                        <IconButton
                            icon={<FilterIcon />}
                            variant="secondary"
                            state="default"
                            size="medium"
                            badge={false}
                        />
                    </div>

                    <div className={styles.widgetsContainer}>
                        <OperationsWidget
                            title="Баланс"
                            leftIcon={<WalletIcon />}
                            periodButtonLabel="Месяц"
                            income={totalData?.income || 0}
                            expenses={totalData?.expense || 0}
                            incomeBarHeight={36}
                            expensesBarHeight={36}
                        />

                        {isLoading && <div>Загрузка...</div>}
                        {error && <div>Ошибка загрузки транзакций</div>}
                        {!isLoading && !error && (
                            <TransactionsListWidget transactions={transactions} />
                        )}
                    </div>
                </div>
            </div>
            <ExpenseAddModal isOpen={addModalOpen} setIsOpen={setAddModalOpen}  />
        </div>
    );
};
