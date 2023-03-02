import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { SERVER_URL } from '~/lib/constants';
import { RootState } from '~/store';

export const storyAPI = createApi({
  reducerPath: 'storyAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/api/story`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Story'],
  endpoints: (build) => ({
    addStory: build.mutation<IStoryFull, IAddStory>({
      query: (data) => ({
        url: '/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Story'],
    }),
    editStory: build.mutation<IStoryFull, IEditStory>({
      query: (data) => ({
        url: `/${data.id}`,
        method: 'PUT',
        body: data.data,
      }),
      invalidatesTags: ['Story'],
    }),
    deleteStory: build.mutation<IMessage, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Story'],
    }),
    getAllStories: build.query<IStoryFull[], string>({
      query: () => ({
        url: '/cp',
        method: 'GET',
      }),
      providesTags: ['Story'],
    }),
  }),
});

export const {
  useAddStoryMutation,
  useEditStoryMutation,
  useDeleteStoryMutation,
  useGetAllStoriesQuery,
} = storyAPI;
