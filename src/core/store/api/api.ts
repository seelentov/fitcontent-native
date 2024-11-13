import AsyncStorage from '@react-native-async-storage/async-storage';
import { isRejected, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Alert } from 'react-native';

export const BASE_URL = 'http://localhost'
export const API_URL = BASE_URL + '/api'

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
            headers.set('Authorization', "Bearer" + token);
            headers.set('Content-Type', "application/json")
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