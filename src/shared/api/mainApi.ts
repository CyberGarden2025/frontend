import { type BaseQueryFn, type FetchArgs, fetchBaseQuery, type FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import { keycloak } from '../../kcProvider';

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

    try {
        if (keycloak?.authenticated) {
            await keycloak.updateToken(30);
        }
    } catch (error) {
        if (import.meta.env.DEV) {
            console.warn('[API] Failed to refresh Keycloak token', error);
        }
    }

    const token = keycloak?.token || localStorage.getItem('accessToken');
    if (token) {
        const headers = new Headers(modifiedArgs.headers as HeadersInit | undefined);
        headers.set('Authorization', `Bearer ${token}`);
        modifiedArgs.headers = headers;
    }

    const result = await baseQuery(modifiedArgs, api, extraOptions);

    if (result?.error && import.meta.env.DEV) {
        console.error('[API] Request error:', {
            status: result.error.status,
            data: result.error.data,
            url: typeof args === 'string' ? args : args.url,
        });
    }

    if (result?.error?.status === 401 && keycloak?.authenticated) {
        if (import.meta.env.DEV) {
            console.warn('[API] 401 error detected, attempting token refresh');
        }
        try {
            await keycloak.updateToken(-1);
            const newToken = keycloak.token || localStorage.getItem('accessToken');
            if (newToken) {
                const headers = new Headers(modifiedArgs.headers as HeadersInit | undefined);
                headers.set('Authorization', `Bearer ${newToken}`);
                modifiedArgs.headers = headers;
                return await baseQuery(modifiedArgs, api, extraOptions);
            }
        } catch (error) {
            if (import.meta.env.DEV) {
                console.warn('[API] Token refresh failed, user may need to re-authenticate', error);
            }
        }
    }

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
