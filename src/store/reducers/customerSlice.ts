import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store";

export interface CustomerAuthState {
    name: string | null;
    location: string | null;
    customerAuthToken: string | null;
    customerRefreshToken: string | null;
}

const initialState: CustomerAuthState = {
    name: null,
    location: null,
    customerAuthToken: null,
    customerRefreshToken: null,
}

export const customerAuthSlice = createSlice({
    name: "customerAuth",
    initialState,
    reducers: {
        setCustomer: (state, action: PayloadAction<{ name: string, location: string, customerAuthToken: string, customerRefreshToken: string }>) => {
            localStorage.setItem("customer", JSON.stringify({
                name: action.payload.name,
                location: action.payload.location,
                customerAuthToken: action.payload.customerAuthToken,
                customerRefreshToken: action.payload.customerAuthToken,
            }))
            state.name = action.payload.name;
            state.location = action.payload.location;
            state.customerAuthToken = action.payload.customerAuthToken;
            state.customerRefreshToken = action.payload.customerRefreshToken;
        },
        removeCustomer: (state) => {
            localStorage.removeItem("customer");
            state.name = "";
            state.location = "";
            state.customerAuthToken = "";
            state.customerRefreshToken = "";
        }
    }
})

export const selectCustomerAuth = (state: RootState) => state.customerAuth;

export const { setCustomer, removeCustomer } = customerAuthSlice.actions;

export default customerAuthSlice.reducer;