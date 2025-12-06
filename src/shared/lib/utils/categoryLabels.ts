export const categoryLabels: Record<string, string> = {
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

export const getCategoryLabel = (category: string): string => {
    return categoryLabels[category] || category;
};

