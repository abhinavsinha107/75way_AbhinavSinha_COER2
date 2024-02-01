import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000'
    }),
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
            query: (body: { location: string, customerAuthToken: string, customerRefreshToken: string }) => {
                return {
                    url: "/api/customer/updateCustomerLocation",
                    method: "POST",
                    body,
                }
            }
        }),
        getNearbyDrivers: builder.mutation({
            query: (body: { location: string }) => {
                return {
                    url: "/api/customer/getNearbyCabs",
                    method: "POST",
                    body,
                }
            }
        }),
        requestRide: builder.mutation({
            query: (body: { driverId: string, customerAuthToken: string, customerRefreshToken: string, location: string }) => {
                return {
                    url: "/api/customer/requestRide",
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
            query: (body: { location: string, driverAuthToken: string, driverRefreshToken: string }) => {
                return {
                    url: "/api/driver/updateDriverLocation",
                    method: "POST",
                    body,
                }
            }
        }),
    }),
})

export const { useRegisterCustomerMutation, useLoginCustomerMutation, useLazyLogoutCustomerQuery, useUpdateCustomerLocMutation, useRequestRideMutation, useRegisterDriverMutation, useLoginDriverMutation, useLazyLogoutDriverQuery, useUpdateDriverLocMutation, useGetNearbyDriversMutation } = api;