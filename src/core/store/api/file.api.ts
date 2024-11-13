import { api } from './api'
export const fileApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getFile: builder.query<IResponse<IFile>, { id: number }>({
            query: ({ id }) => `/files/${id}`,
            providesTags: ['file', "auth"],
        }),
        createFile: builder.mutation<IResponse<IFile>, IFileStoreRequest>({
            query: (body) => ({
                url: "/files/",
                method: "POST",
                body,
            }),
            invalidatesTags: ['file'],
        }),
        updateFile: builder.mutation<IResponse<IFile>, { id: number } & IFileUpdateRequest>({
            query: ({ id, ...body }) => ({
                url: `/files/${id}}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ['file'],
        }),

        removeFile: builder.mutation<IResponse<void>, { id: number }>({
            query: ({ id }) => ({
                url: `/files/${id}}`,
                method: "DELETE"
            }),
            invalidatesTags: ['file'],
        }),



    }),
})

export const { useGetFileQuery, useCreateFileMutation, useRemoveFileMutation, useUpdateFileMutation } = fileApi