import mainApi from './mainApi';

export interface LimitResponse {
    name: string;
    icon: string;
    description: string;
    limit: number;
    spent: number;
    period: string;
    categories: string[];
}

export const limitsApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({
        getLimits: builder.query<LimitResponse[], void>({
            query: () => ({
                url: '/limits',
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetLimitsQuery } = limitsApi;

