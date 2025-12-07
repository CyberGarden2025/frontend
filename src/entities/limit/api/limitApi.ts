import mainApi from '@shared/api/mainApi';
import type { Limit, NewLimit } from '../interface';

export const limitApi = mainApi.injectEndpoints({
    endpoints: builder => ({
        addLimit: builder.mutation<null, NewLimit>({
            query: body => ({
                body,
                url: `/limits`,
                method: 'POST',
            }),
            invalidatesTags: ['Limit'],
        }),
        getLimits: builder.query<Limit[], null>({
            query: () => ({
                url: `/limits`,
                method: 'GET',
            }),
            providesTags: ['Limit'],
        }),
    }),
});

export const { useAddLimitMutation, useGetLimitsQuery } = limitApi;
