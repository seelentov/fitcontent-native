import { api } from './api'
export const folderApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getFolder: builder.query<IResponse<IFolderPage>, { id: number | null }>({
            query: ({ id }) => `/folders/${id ? id : ""}`,
            providesTags: ['folder', "auth"],
        }),
        createFolder: builder.mutation<IResponse<IFolder>, IFolderStoreRequest>({
            query: (body) => ({
                url: "/folders",
                method: "POST",
                body,
            }),
            invalidatesTags: ['folder'],
        }),
        updateFolder: builder.mutation<IResponse<IFolder>, { id: number } & IFolderUpdateRequest>({
            query: ({ id, ...body }) => ({
                url: `/folders/${id}}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ['folder'],
        }),

        removeFolder: builder.mutation<IResponse<void>, { id: number }>({
            query: ({ id }) => ({
                url: `/folders/${id}}`,
                method: "DELETE"
            }),
            invalidatesTags: ['folder'],
        }),
    }),
})

export const { useGetFolderQuery, useCreateFolderMutation, useRemoveFolderMutation, useUpdateFolderMutation } = folderApi