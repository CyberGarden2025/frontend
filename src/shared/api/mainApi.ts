import {
    type BaseQueryFn,
    type FetchArgs,
    fetchBaseQuery,
    type FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';

const ensureProtocol = (host: string): string => {
    if (!host) {
        return '';
    }
    return host.startsWith('http://') || host.startsWith('https://') ? host : `http://${host}`;
};

export const apiBaseUrl = `${ensureProtocol(import.meta.env.VITE_AGW_HOST || 'localhost')}:${
    import.meta.env.VITE_AGW_PORT || '8000'
}/api`;

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
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions,
) => {
    const modifiedArgs: FetchArgs =
        typeof args === 'string'
            ? { url: args }
            : {
                  ...args,
              };

    const result = await baseQuery(modifiedArgs, api, extraOptions);

    return result;
};

const mainApi = createApi({
    reducerPath: 'mainApi',
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({
        updateFcmToken: builder.mutation<void, { userId: string; fcmToken: string }>({
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
