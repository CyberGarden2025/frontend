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

export interface TransactionsTotalParams {
    userId: number;
    start: string;
    end: string;
}

export interface TransactionsTotalResponse {
    income: number;
    expense: number;
}

export const transactionsApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({
        getTransactions: builder.query<BackendTransactionDay[], null>({
            query: () => ({
                url: `http://localhost:3000/api/transactions`,
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
    }),
});

export const { useGetTransactionsQuery, useGetTransactionsTotalQuery } = transactionsApi;

