import mainApi from "@shared/api/mainApi";
import type { NewTransaction } from "../interface";

export const expenseApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({
        addOperation: builder.mutation<any, NewTransaction>({
            query: (body) => ({
                body,
                url: `/transactions/1`,
                method: 'POST',
            }),
        }),
    })
}) 
export const {useAddOperationMutation} = expenseApi