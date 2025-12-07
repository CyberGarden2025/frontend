import { CrossIcon, TextIcon } from '@shared/ui/icons';
import cls from './NewLimitForm.module.scss';
import { useState } from 'react';
import { limitIcons, type NewLimit } from '@entities/limit';
import clsx from 'clsx';
import { readableCategory, type ExpenseType } from '@entities/expense';
import { Button, Dropdown } from '@shared/ui';

export const NewLimitForm = () => {
    const [data, setdata] = useState<NewLimit>({
        icon: null,
        limit: null,
        name: '',
        period: '',
        description: null,
        categories: [],
    });

    const handleChange = (key: keyof NewLimit, value: string | number) => {
        setdata(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    return (
        <ul className={cls.list}>
            <li className={cls.card}>
                <h3 className={cls.subTitle}>Базовые настройки</h3>
                <div className={cls.name}>
                    <div className={cls.icon}>
                        <TextIcon />
                    </div>
                    <input
                        placeholder="Введите название..."
                        className={cls.nameInput}
                        value={data.name}
                        onChange={e => handleChange('name', e.target.value)}
                        type="text"
                    />
                </div>
                <div className={cls.icons}>
                    <h4 className={cls.iconTitle}>Выберите иконку</h4>
                    <ul className={cls.list}>
                        {Object.keys(limitIcons).map(item => (
                            <li
                                className={clsx(cls.item, {
                                    [cls.active]: data.icon === item,
                                })}
                                onClick={() => handleChange('icon', item)}
                            >
                                {limitIcons[item]}
                            </li>
                        ))}
                    </ul>
                </div>
            </li>
            <li className={cls.card}>
                <h3 className={cls.subTitle}>Описание категории</h3>
                <textarea
                    className={cls.textArea}
                    onChange={e => handleChange('description', e.target.value)}
                    name="categories description"
                    value={data.description}
                />
                <p className={cls.descriptionText}>На основе ИИ выделили:</p>
                <ul className={cls.categoryList}>
                    {data.categories.map(item => (
                        <li key={item} className={cls.categoryItem}>
                            <p>{readableCategory[item]}</p>
                            <span
                                onClick={() => {
                                    setdata(prev => ({
                                        ...prev,
                                        categories: prev.categories.filter(
                                            category => category !== item,
                                        ),
                                    }));
                                }}
                            >
                                <CrossIcon />
                            </span>
                        </li>
                    ))}
                </ul>
                <p className={cls.descriptionText}>Сюда можно добавить ещё категории:</p>
                <Dropdown
                    items={Object.keys(readableCategory).map(item => ({
                        label: readableCategory[item],
                        value: item,
                    }))}
                    value={data.categories}
                    multiple
                    placeholder="Выбрать категории"
                    onChange={(value: string[]) => {
                        setdata(prev => ({
                            ...prev,
                            categories: value as ExpenseType[],
                        }));
                    }}
                />
            </li>
            <li className={cls.card}>
                <h3 className={cls.subTitle}>Укажите порог лимита</h3>
                <div className={cls.limitInputWrapper}>
                    <input
                        placeholder="10 000"
                        type="number"
                        className={cls.limitInput}
                        value={data.limit || ''}
                        onChange={e => handleChange('limit', +e.target.value)}
                    />
                </div>
            </li>
            <li className={cls.card}>
                <h3 className={cls.subTitle}>Частота обновления</h3>
                <Dropdown
                    items={[
                        {
                            value: '1',
                            label: 'Раз в месяц',
                        },

                        {
                            value: '4',
                            label: 'Раз в 3 месяца',
                        },

                        {
                            value: '3',
                            label: 'Раз в пол года',
                        },
                    ]}
                    value={data.period}
                    placeholder="Выбрать период обновления"
                    onChange={(value: string) => {
                        setdata(prev => ({
                            ...prev,
                            period: value,
                        }));
                    }}
                />
            </li>
            <li className={cls.card}>
                <h3 className={cls.subTitle}>Период действия</h3>
            </li>

            <Button label="Сохранить лимит" />
        </ul>
    );
};
