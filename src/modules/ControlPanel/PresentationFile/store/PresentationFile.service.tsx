import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { SERVER_URL } from '~/lib/constants';
import { RootState } from '~/store';

export const fileAPI = createApi({
  reducerPath: 'fileAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/api/file`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['File'],
  endpoints: (build) => ({
    addFile: build.mutation<IMessage, FormData>({
      query: (data) => ({
        url: '/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['File'],
    }),
    deleteFile: build.mutation<IMessage, string>({
      query: () => ({
        url: '/',
        method: 'DELETE',
      }),
      invalidatesTags: ['File'],
    }),
    getFileInfo: build.query<IPresFileFull, string>({
      query: () => ({
        url: '/cp',
        method: 'GET',
      }),
      providesTags: ['File'],
    }),
  }),
});

export const { useAddFileMutation, useDeleteFileMutation, useGetFileInfoQuery } = fileAPI;
