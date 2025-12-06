import type { ExpenseType } from "@entities/expense/type";

export const readableCategory: Record<ExpenseType, string> = {
    'Food': "Продукты",
    'Misc': "Разное",
    'Rent': "Аренда/Ипотека",
    'Salary': "Зарплата",
    'Shopping': "Покупки",
    'Transport': "Транспорт",
}