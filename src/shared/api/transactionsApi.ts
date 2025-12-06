import mainApi from './mainApi';

export interface BackendTransaction {
    category: string;
    sum: number;
}

export interface BackendTransactionDay {
    date: string;
    daySum: number;
    transaction: BackendTransaction[];
}

export interface TransactionsTotalParams {
    userId: number;
    start: string;
    end: string;
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
        getTransactions: builder.query<BackendTransactionDay[], number>({
            query: (userId) => ({
                url: `http://localhost:3000/api/transactions/${userId}`,
                method: 'GET',
            }),
        }),
        getTransactionsTotal: builder.query<TransactionsTotalResponse, TransactionsTotalParams>({
            query: ({ userId, start, end }) => ({
                url: `http://localhost:3000/api/transactions/${userId}/total`,
                method: 'GET',
                params: { start, end },
            }),
        }),
        getExpensesChart: builder.mutation<ExpensesChartResponse, { userId: number; startDate: string }>({
            query: ({ userId, startDate }) => ({
                url: `/transactions/${userId}/expenses-chart`,
                method: 'POST',
                body: { startDate },
            }),
        }),
        getMonthSummary: builder.mutation<MonthSummaryResponse, { userId: number; monthDate: string }>({
            query: ({ userId, monthDate }) => ({
                url: `/transactions/${userId}/month-summary`,
                method: 'POST',
                body: { monthDate },
            }),
        }),
        getCategoriesMonth: builder.mutation<CategoriesMonthResponse, { userId: number; monthDate: string }>({
            query: ({ userId, monthDate }) => ({
                url: `/transactions/${userId}/categories-month`,
                method: 'POST',
                body: { monthDate },
            }),
        }),
    }),
});

export const { useGetTransactionsQuery, useGetTransactionsTotalQuery, useGetExpensesChartMutation, useGetMonthSummaryMutation, useGetCategoriesMonthMutation } = transactionsApi;

