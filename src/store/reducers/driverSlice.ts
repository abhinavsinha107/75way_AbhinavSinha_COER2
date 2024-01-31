import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store";

export interface DriverAuthState {
    name: string | null;
    token: string | null;
    status: boolean;
}

const initialState: DriverAuthState = {
    name: null,
    token: null,
    status: false,
}

export const driverAuthSlice = createSlice({
    name: "driverAuth",
    initialState,
    reducers: {
        setDriver: (state, action: PayloadAction<{ name: string, token: string, status: boolean }>) => {
            localStorage.setItem("driver", JSON.stringify({
                name: action.payload.name,
                token: action.payload.token,
                status: action.payload.status
            }))
            state.name = action.payload.name;
            state.token = action.payload.token;
            state.status = action.payload.status;
        },
        removeDriver: (state) => {
            localStorage.removeItem("driver");
            state.name = "";
            state.token = "";
            state.status = false;
        }
    }
})

export const selectDriverAuth = (state: RootState) => state.driverAuth;

export const { setDriver, removeDriver } = driverAuthSlice.actions;

export default driverAuthSlice.reducer;