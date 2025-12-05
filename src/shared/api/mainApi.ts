import { type BaseQueryFn, type FetchArgs, fetchBaseQuery, type FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';

interface RefreshResponse {
    accessToken: string;
}

const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_AGW_HOST}:${import.meta.env.VITE_AGW_PORT}/api`,
    credentials: 'include',
    prepareHeaders: (headers) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            headers.set('Authorization', `Bearer ${accessToken}`);
        }
        return headers;
    },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
        const refreshResult = await baseQuery('/auth/refresh-tokens', api, extraOptions);

        if (refreshResult.data) {
            const { accessToken } = refreshResult.data as RefreshResponse;
            localStorage.setItem('accessToken', accessToken.split(' ')[1]);
            result = await baseQuery(args, api, extraOptions);
        } else {
            localStorage.removeItem('accessToken');
        }
    }

    return result;
};

const mainApi = createApi({
    reducerPath: 'mainApi',
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
    tagTypes: [''],
});

export default mainApi;
