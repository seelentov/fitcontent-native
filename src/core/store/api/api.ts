import AsyncStorage from '@react-native-async-storage/async-storage';
import { isRejected, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Alert } from 'react-native';

export const BASE_URL = 'http://195.133.73.13'
export const API_URL = BASE_URL + '/api'

const testToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTk1LjEzMy43My4xMy9hcGkvYXV0aC9sb2dpbiIsImlhdCI6MTczMTUyMzg0MywiZXhwIjoxNzMxNTI3NDQzLCJuYmYiOjE3MzE1MjM4NDMsImp0aSI6IjJYeEVpM25kNzFGb2h1Nm4iLCJzdWIiOiIxIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.4qxfrcKz8DuOVlhsKJydbUnUBYeekoPxxr9FNDy2YyQ"

export const rtkQueryErrorLogger: Middleware =
    (api: MiddlewareAPI) => (next: any) => (action: any) => {
        if (isRejected(action)) {
            const error = `${action.meta.baseQueryMeta.request.url.replace(API_URL, "")}\n${JSON.stringify(action.error)}`
            Alert.alert("ERROR", error)
        }
        return next(action);
    };

export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['auth', 'file', 'folder'],
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: async (headers, { getState }) => {
            const token = (getState() as any).auth.token || await AsyncStorage.getItem("token")
            headers.set('Authorization', "Bearer " + token);
            headers.set('Content-Type', "application/json")
            headers.set('Accept', "application/json")
            return headers
        }
    }),
    endpoints: builder => ({
        base: builder.query<any, void>({
            query: () => '/',
            providesTags: []
        }),
    }),
})
export const { useBaseQuery } = api