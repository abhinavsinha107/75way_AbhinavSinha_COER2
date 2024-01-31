import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store";

export interface CustomerAuthState {
    name: string | null;
    token: string | null;
}

const initialState: CustomerAuthState = {
    name: null,
    token: null
}

export const customerAuthSlice = createSlice({
    name: "customerAuth",
    initialState,
    reducers: {
        setCustomer: (state, action: PayloadAction<{ name: string, token: string }>) => {
            localStorage.setItem("customer", JSON.stringify({
                name: action.payload.name,
                token: action.payload.token
            }))
            state.name = action.payload.name;
            state.token = action.payload.token;
        },
        removeCustomer: (state) => {
            localStorage.removeItem("customer");
            state.name = "";
            state.token = "";
        }
    }
})

export const selectCustomerAuth = (state: RootState) => state.customerAuth;

export const { setCustomer, removeCustomer } = customerAuthSlice.actions;

export default customerAuthSlice.reducer;