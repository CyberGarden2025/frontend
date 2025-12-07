import { useState, type FC } from 'react';
import cls from './ExpenseAddForm.module.scss';
import type { ExpenseAddFormProps } from './ExpenseAddForm.props';
import { CalendarIcon } from '@shared/ui/icons';
import { Button, Dropdown } from '@shared/ui';
import { useAddOperationMutation } from '@entities/expense/api';
import type { NewTransaction } from '@entities/expense/interface';
import { readableCategory } from '@entities/expense/lib';

export const ExpenseAddForm: FC<ExpenseAddFormProps> = ({ type, onFinish }) => {
    const [data, setData] = useState<NewTransaction>({
        sum: null,
        transactionDate: '12.12.2023',
        category: '',
    });
    const [trigger] = useAddOperationMutation();

    const handleSend = async () => {
        await trigger(data);
        onFinish();
    };

    if (type === 0) {
        return (
            <form className={cls.form}>
                <input
                    value={data.sum}
                    onChange={e => setData(prev => ({ ...prev, sum: +e.target.value }))}
                    type="number"
                    className={cls.numberInput}
                    placeholder="Сумма"
                />
                <div className={cls.inputWrapper}>
                    <div className={cls.iconWrapper}>
                        <CalendarIcon />
                    </div>
                    <Dropdown
                        placeholder="Выберите категорию"
                        items={Object.keys(readableCategory).map(item => ({
                            label: readableCategory[item],
                            value: item,
                        }))}
                        value={data.category}
                        onChange={val =>
                            setData(prev => ({
                                ...prev,
                                category: val,
                            }))
                        }
                    />
                </div>
                <Button onClick={() => handleSend()} label={'Сохранить'} />
            </form>
        );
    } else if (type === 1) {
        return (
            <form className={cls.form}>
                <input
                    type="number"
                    onChange={e => setData(prev => ({ ...prev, sum: +e.target.value }))}
                    value={data.sum}
                    className={cls.numberInput}
                    placeholder="Сумма*"
                />
                <input
                    type="text"
                    onChange={e => setData(prev => ({ ...prev, category: e.target.value }))}
                    value={data.category}
                    className={cls.numberInput}
                    placeholder="Категория"
                />
                <div className={cls.inputWrapper}>
                    <div className={cls.iconWrapper}>
                        <CalendarIcon />
                    </div>
                    <input
                        type="text"
                        className={cls.dateInput}
                        value={data.transactionDate}
                        onChange={e =>
                            setData(prev => ({ ...prev, transactionDate: e.target.value }))
                        }
                        placeholder="дд.мм.гггг"
                    />
                </div>
                <Button onClick={() => handleSend()} label={'Сохранить'} />
            </form>
        );
    }
};
