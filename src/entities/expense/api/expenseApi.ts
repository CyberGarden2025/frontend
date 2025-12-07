import mainApi from "@shared/api/mainApi";
import type { NewTransaction } from "../interface";
import type { Operation } from "../interface/operation.interface";

export const expenseApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({
        addOperation: builder.mutation<Operation, NewTransaction>({
            query: (body) => ({
                body,
                url: `/transactions`,
                method: 'POST',
            }),
            invalidatesTags: ['Transaction'],
        }),
        getOperation: builder.query<Operation, {id: number}>({
            query: ({id}) => ({
                url: `/transactions/${id}/`,

            }),
            providesTags: ['Transaction'],
        })
    })
}) 
export const {useAddOperationMutation, useLazyGetOperationQuery} = expenseApi