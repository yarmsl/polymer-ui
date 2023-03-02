import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { SERVER_URL } from '~/lib/constants';
import { RootState } from '~/store';

export const tagAPI = createApi({
  reducerPath: 'tagAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/api/tag`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Tag'],
  endpoints: (build) => ({
    addTag: build.mutation<ITag, IAddTag>({
      query: (tagData) => ({
        url: '/',
        method: 'POST',
        body: tagData,
      }),
      invalidatesTags: ['Tag'],
    }),
    editTag: build.mutation<ITag, IEditTag>({
      query: (editTagData) => ({
        url: `/${editTagData.id}`,
        method: 'PUT',
        body: editTagData.data,
      }),
      invalidatesTags: ['Tag'],
    }),
    deleteTag: build.mutation<IMessage, string>({
      query: (tagId) => ({
        url: `/${tagId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tag'],
    }),
    getAllTags: build.query<ITagFull[], string>({
      query: () => ({
        url: '/cp',
        method: 'GET',
      }),
      providesTags: ['Tag'],
    }),
  }),
});

export const { useAddTagMutation, useEditTagMutation, useDeleteTagMutation, useGetAllTagsQuery } =
  tagAPI;
