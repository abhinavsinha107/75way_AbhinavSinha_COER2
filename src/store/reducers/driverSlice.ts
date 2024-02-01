import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store";

export interface DriverAuthState {
    name: string | null;
    location: string | null;
    driverAuthToken: string | null;
    driverRefreshToken: string | null;
    status: boolean;
}

const initialState: DriverAuthState = {
    name: null,
    location: null,
    driverAuthToken: null,
    driverRefreshToken: null,
    status: false,
}

export const driverAuthSlice = createSlice({
    name: "driverAuth",
    initialState,
    reducers: {
        setDriver: (state, action: PayloadAction<{ name: string, location: string, driverAuthToken: string, driverRefreshToken: string, status: boolean }>) => {
            localStorage.setItem("driver", JSON.stringify({
                name: action.payload.name,
                location: action.payload.location,
                driverAuthToken: action.payload.driverAuthToken,
                driverRefreshToken: action.payload.driverRefreshToken,
                status: action.payload.status
            }))
            state.name = action.payload.name;
            state.location = action.payload.location;
            state.driverAuthToken = action.payload.driverAuthToken;
            state.driverRefreshToken = action.payload.driverRefreshToken;
            state.status = action.payload.status;
        },
        removeDriver: (state) => {
            localStorage.removeItem("driver");
            state.name = "";
            state.location = "";
            state.driverAuthToken = "";
            state.driverRefreshToken = "";
            state.status = false;
        }
    }
})

export const selectDriverAuth = (state: RootState) => state.driverAuth;

export const { setDriver, removeDriver } = driverAuthSlice.actions;

export default driverAuthSlice.reducer;