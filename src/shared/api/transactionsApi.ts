import mainApi from './mainApi';

export interface BackendTransaction {
    id: number;
    category: string;
    sum: number;
}

export interface BackendTransactionDay {
    date: string;
    daySum: number;
    transaction: BackendTransaction[];
}

export interface TransactionsTotalResponse {
    income: number;
    expense: number;
}

export interface ExpensesChartRequest {
    startDate: string;
}

export interface ExpensesChartMonth {
    month: string;
    monthFull: string;
    year: number;
    amount: number;
    isPrediction: boolean;
}

export interface ExpensesChartResponse {
    currentMonthExpenses: number;
    months: ExpensesChartMonth[];
}

export interface MonthSummaryRequest {
    monthDate: string;
}

export interface MonthSummaryResponse {
    month: string;
    monthFull: string;
    year: number;
    income: number;
    expenses: number;
    balance: number;
    expensesPercentage: number;
}

export interface CategoriesMonthRequest {
    monthDate: string;
}

export interface CategoriesMonthCategory {
    category: string;
    amount: number;
    percentage: number;
}

export interface CategoriesMonthResponse {
    month: string;
    monthFull: string;
    year: number;
    totalExpenses: number;
    categories: CategoriesMonthCategory[];
}

export const transactionsApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({
        getTransactions: builder.query<BackendTransactionDay[], null>({
            query: () => ({
                url: `/transactions`,
                method: 'GET',
            }),
        }),
        getTransactionsTotal: builder.query<TransactionsTotalResponse, { start: string; end: string }>({
            query: ({ start, end }) => ({
                url: `/transactions/total`,
                method: 'GET',
                params: { start, end },
            }),
        }),
        getExpensesChart: builder.mutation<ExpensesChartResponse, { startDate: string }>({
            query: ({ startDate }) => ({
                url: `/transactions/expenses-chart`,
                method: 'POST',
                body: { startDate },
            }),
        }),
        getMonthSummary: builder.mutation<MonthSummaryResponse, { monthDate: string }>({
            query: ({ monthDate }) => ({
                url: `/transactions/month-summary`,
                method: 'POST',
                body: { monthDate },
            }),
        }),
        getCategoriesMonth: builder.mutation<CategoriesMonthResponse, { monthDate: string }>({
            query: ({ monthDate }) => ({
                url: `/transactions/categories-month`,
                method: 'POST',
                body: { monthDate },
            }),
        }),
        deleteTransaction: builder.mutation<void, { id: number; category: string }>({
            query: ({ id, category }) => ({
                url: `/transactions/${id}`,
                method: 'DELETE',
                body: { category },
            }),
            invalidatesTags: ['Transaction', ],
        }),
    }),
});

export const { useGetTransactionsQuery, useGetTransactionsTotalQuery, useGetExpensesChartMutation, useGetMonthSummaryMutation, useGetCategoriesMonthMutation, useDeleteTransactionMutation } = transactionsApi;
