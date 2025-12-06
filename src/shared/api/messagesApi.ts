import mainApi from './mainApi';

export interface QueueMessageRequest {
    content: string;
    user_uuid: string;
    chat_uuid?: string;
    preferred_model?: string;
}

export interface QueueMessageResponse {
    user_message_id: string;
    ai_message_id: string;
    processing_estimate: {
        estimated_wait_time: number;
        estimated_processing_time: number;
        estimated_total_time: number;
        estimated_start_time: string;
        confidence: number;
    };
}

export interface BackendMessage {
    id: string;
    chat_uuid: string;
    user_uuid: string;
    role: 'user' | 'assistant' | 'system' | 'tool';
    content: string;
    is_complete: boolean;
    created_at: string;
    updated_at: string;
}

export interface GetMessagesParams {
    user_uuid: string;
    chat_uuid?: string;
    role?: string;
    content_search?: string;
    date_from?: string;
    date_to?: string;
    is_complete?: boolean;
    page?: number;
    page_size?: number;
    order_by?: string;
    order_direction?: 'asc' | 'desc';
}

export interface GetMessagesResponse {
    messages: BackendMessage[];
    metadata: {
        total_count: number;
        page: number;
        page_size: number;
        total_pages: number;
        has_next: boolean;
        has_previous: boolean;
        applied_filters: Record<string, unknown>;
        query_performance?: {
            execution_time_ms: number;
            database_query_time_ms: number;
            redis_check_time_ms: number;
            formatting_time_ms: number;
        };
    };
}

export const messagesApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({
        getMessages: builder.query<GetMessagesResponse, GetMessagesParams>({
            query: (params) => {
                if (import.meta.env.DEV) {
                    console.log('[Messages API] getMessages params.user_uuid:', params.user_uuid);
                }
                const searchParams = new URLSearchParams();
                searchParams.append('user_uuid', params.user_uuid);
                if (params.chat_uuid) searchParams.append('chat_uuid', params.chat_uuid);
                if (params.role) searchParams.append('role', params.role);
                if (params.content_search) searchParams.append('content_search', params.content_search);
                if (params.date_from) searchParams.append('date_from', params.date_from);
                if (params.date_to) searchParams.append('date_to', params.date_to);
                if (params.is_complete !== undefined) searchParams.append('is_complete', String(params.is_complete));
                if (params.page) searchParams.append('page', String(params.page));
                if (params.page_size) searchParams.append('page_size', String(params.page_size));
                if (params.order_by) searchParams.append('order_by', params.order_by);
                if (params.order_direction) searchParams.append('order_direction', params.order_direction);

                const url = `/v1/messages/?${searchParams.toString()}`;
                console.log('[Messages API] GET request:', url);
                return {
                    url,
                    method: 'GET',
                };
            },
        }),
        queueMessage: builder.mutation<QueueMessageResponse, QueueMessageRequest>({
            query: ({ content, user_uuid, chat_uuid, preferred_model }) => {
                if (import.meta.env.DEV) {
                    console.log('[Messages API] queueMessage user_uuid:', user_uuid, 'chat_uuid:', chat_uuid);
                }
                const formData = new URLSearchParams();
                formData.append('content', content);
                formData.append('user_uuid', user_uuid);
                if (chat_uuid) {
                    formData.append('chat_uuid', chat_uuid);
                }
                if (preferred_model) {
                    formData.append('preferred_model', preferred_model);
                }

                const body = formData.toString();
                console.log('[Messages API] POST request:', '/v1/messages/queue', body);
                return {
                    url: '/v1/messages/queue',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body,
                };
            },
        }),
    }),
});

export const { useGetMessagesQuery, useLazyGetMessagesQuery, useQueueMessageMutation } = messagesApi;

