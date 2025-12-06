import { type BaseQueryFn, type FetchArgs, fetchBaseQuery, type FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';

interface RefreshResponse {
    accessToken: string;
}

const ensureProtocol = (host: string): string => {
    if (!host) {
        return '';
    }
    return host.startsWith('http://') || host.startsWith('https://') ? host : `http://${host}`;
};

export const apiBaseUrl = `${ensureProtocol(import.meta.env.VITE_AGW_HOST || 'localhost')}:${import.meta.env.VITE_AGW_PORT || '8000'}/api`;

if (import.meta.env.DEV) {
    console.log('[API] Base URL:', apiBaseUrl);
    console.log('[API] Environment:', {
        VITE_AGW_HOST: import.meta.env.VITE_AGW_HOST,
        VITE_AGW_PORT: import.meta.env.VITE_AGW_PORT,
    });
}

const baseQuery = fetchBaseQuery({
    baseUrl: apiBaseUrl,
    credentials: 'include',
    prepareHeaders: headers => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            headers.set('Authorization', `Bearer ${accessToken}`);
        }
        return headers;
    },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions,
) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error) {
        if (import.meta.env.DEV) {
            console.error('[API] Request error:', {
                status: result.error.status,
                data: result.error.data,
                url: typeof args === 'string' ? args : args.url,
            });
        }
    }

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
    endpoints: builder => ({
        updateFcmToken: builder.mutation<void, { userId: number; fcmToken: string }>({
            query: ({ userId, fcmToken }) => ({
                url: '/notifications/token',
                method: 'PATCH',
                body: { userId, fcmToken },
            }),
        }),
    }),
    tagTypes: [''],
});

export const { useUpdateFcmTokenMutation } = mainApi;

export default mainApi;
