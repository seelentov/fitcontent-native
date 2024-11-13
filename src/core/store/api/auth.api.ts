import { api } from './api'
export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getMe: builder.query<IResponse<IUser>, void>({
            query: () => '/auth/me',
            providesTags: ['auth'],
        }),
        login: builder.mutation<IResponse<void>, IAuthIndexRequest>({
            query: (body) => ({
                url: "/auth/login",
                method: "POST",
                body,
            }),
            invalidatesTags: ['auth'],
        }),
        signUp: builder.mutation<IResponse<void>, IAuthStoreRequest>({
            query: (body) => ({
                url: "/auth/register",
                method: "POST",
                body,
            }),
            invalidatesTags: ['auth'],
        }),

        logout: builder.mutation<IResponse<void>, void>({
            query: (body) => ({
                url: "/auth/register",
                method: "POST",
                body,
            }),
            invalidatesTags: ['auth'],
        }),

        refresh: builder.mutation<IResponseWithToken, void>({
            query: (body) => ({
                url: "/auth/register",
                method: "POST",
                body,
            }),
            invalidatesTags: ['auth'],
        })

    }),
})

export const { useGetMeQuery, useLoginMutation, useSignUpMutation, useLogoutMutation, useRefreshMutation } = authApi