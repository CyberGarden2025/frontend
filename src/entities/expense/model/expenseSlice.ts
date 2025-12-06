import { createSlice } from "@reduxjs/toolkit"
import type { ExpenseFiltersDate } from "../interface"

interface InitialState {
    filters: {
        period: ExpenseFiltersDate
    }
}

const initialState: InitialState = {
    filters: {
        period: null
    }
}

export const expenseSlice = createSlice({
    initialState,
    name: "expense",
    reducers: {
        updateFiltersPeriod(state, action: {payload: ExpenseFiltersDate}) {
            state.filters.period = action.payload
        }
    },
})

export const {updateFiltersPeriod} = expenseSlice.actions