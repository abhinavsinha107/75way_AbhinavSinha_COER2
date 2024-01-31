import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface Driver {
    name: string;
    email: string;
    password: string;
    location: string;
    vehicleType: string;
}

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
    endpoints: (builder) => ({
        registerCustomer: builder.mutation({
            query: (body: { name: string; email: string; password: string; }) => {
                return {
                    url: "/api/customerAuth/register",
                    method: "POST",
                    body,
                }
            }
        }),
        loginCustomer: builder.mutation({
            query: (body: { email: string; password: string }) => {
                return {
                    url: "/api/customerAuth/login",
                    method: "POST",
                    body,
                }
            }
        }),
        logoutCustomer: builder.query<void, void>({
            query: () => "/api/customerAuth/logout"
        }),
        updateCustomerLoc: builder.mutation({
            query: (body: { location: string }) => {
                return {
                    url: "/api/customerLoc/updateCustomerLocation",
                    method: "POST",
                    body,
                }
            }
        }),
        registerDriver: builder.mutation({
            query: (body: { name: string; email: string; password: string }) => {
                return {
                    url: "/api/driverAuth/register",
                    method: "POST",
                    body,
                }
            }
        }),
        loginDriver: builder.mutation({
            query: (body: { email: string; password: string }) => {
                return {
                    url: "/api/driverAuth/login",
                    method: "POST",
                    body,
                }
            }
        }),
        logoutDriver: builder.query<void, void>({
            query: () => "/api/driverAuth/logout"
        }),
        updateDriverLoc: builder.mutation({
            query: (body: { location: string }) => {
                return {
                    url: "/api/driverLoc/updateDriverLocation",
                    method: "POST",
                    body,
                }
            }
        }),
        getNearbyDrivers: builder.query({
            query: (body: { location: string }) => `/api/driverLoc/getNearbyCabs`,
        }),
    }),
})

export const { useRegisterCustomerMutation, useLoginCustomerMutation, useLazyLogoutCustomerQuery, useUpdateCustomerLocMutation, useRegisterDriverMutation, useLoginDriverMutation, useLazyLogoutDriverQuery, useUpdateDriverLocMutation, useLazyGetNearbyDriversQuery } = api;