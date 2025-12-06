import { expenseSlice } from '@entities/expense';
import { configureStore } from '@reduxjs/toolkit';
import mainApi from '@shared/api/mainApi';


export const store = configureStore({
    reducer: {
        [mainApi.reducerPath]: mainApi.reducer,
        expenseSlice: expenseSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(mainApi.middleware),
    devTools: true,
});
