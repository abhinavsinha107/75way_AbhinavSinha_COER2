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
        updateCustomerStatus: builder.mutation({
            query: (body: { customerAuthToken: string, customerRefreshToken: string, currentStatus: string }) => {
                return {
                    url: "/api/customer/updateCustomerStatus",
                    method: "POST",
                    body,
                }
            }
        }),
        getCustomerStatus: builder.mutation({
            query: (body: { customerAuthToken: string, customerRefreshToken: string }) => {
                return {
                    url: "/api/customer/getCustomerStatus",
                    method: "POST",
                    body,
                }
            }
        }),
        getRideHistory: builder.mutation({
            query: (body: { customerAuthToken: string, customerRefreshToken: string }) => {
                return {
                    url: "/api/customer/getRideHistory",
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
        getCabRequests: builder.mutation({
            query: (body: { driverAuthToken: string, driverRefreshToken: string }) => {
                return {
                    url: "/api/driver/getCabRequests",
                    method: "POST",
                    body,
                }
            }
        }),
        approveRequest: builder.mutation({
            query: (body: {customerId: string, driverAuthToken: string, driverRefreshToken: string, location: string }) => {
                return {
                    url: "/api/driver/approveRequest",
                    method: "POST",
                    body,
                }
            }
        }),
        cancelRequest: builder.mutation({
            query: (body: { customerId: string, driverAuthToken: string, driverRefreshToken: string, location: string }) => {
                return {
                    url: "/api/driver/cancelRequest",
                    method: "POST",
                    body,
                }
            }
        }),
        startRide: builder.mutation({
            query: (body: { customerId: string, driverAuthToken: string, driverRefreshToken: string, location: string }) => {
                return {
                    url: "/api/driver/startRide",
                    method: "POST",
                    body,
                }
            }
        }),
        finishRide: builder.mutation({
            query: (body: { customerId: string, driverAuthToken: string, driverRefreshToken: string, location: string }) => {
                return {
                    url: "/api/driver/finishRide",
                    method: "POST",
                    body,
                }
            }
        }),
    }),
})

export const { useRegisterCustomerMutation, useLoginCustomerMutation, useLazyLogoutCustomerQuery, useUpdateCustomerLocMutation, useRequestRideMutation, useRegisterDriverMutation, useLoginDriverMutation, useLazyLogoutDriverQuery, useUpdateDriverLocMutation, useGetNearbyDriversMutation, useGetCabRequestsMutation, useApproveRequestMutation, useUpdateCustomerStatusMutation, useGetCustomerStatusMutation, useCancelRequestMutation, useStartRideMutation, useFinishRideMutation, useGetRideHistoryMutation } = api;