import { configureStore } from "@reduxjs/toolkit";
import { api } from "../services/api"
import { setupListeners } from '@reduxjs/toolkit/query/react'
import customerAuthReducer from "./reducers/customerSlice"
import driverAuthReducer from "./reducers/driverSlice"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        customerAuth: customerAuthReducer,
        driverAuth: driverAuthReducer,
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),

});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector