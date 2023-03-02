import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { SERVER_URL } from '~/lib/constants';
import { RootState } from '~/store';

export const mailAPI = createApi({
  reducerPath: 'mailAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/api/mail`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Mail'],
  endpoints: (build) => ({
    addMails: build.mutation<IMessage, IAddMails>({
      query: (data) => ({
        url: '/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Mail'],
    }),
    sendFileToMail: build.mutation<IMessage, IWantFile>({
      query: (data) => ({
        url: '/file',
        method: 'POST',
        body: data,
      }),
    }),
    feedback: build.mutation<IMessage, Ifeedback>({
      query: (data) => ({
        url: '/feedback',
        method: 'POST',
        body: data,
      }),
    }),
    deleteMails: build.mutation<IMessage, string>({
      query: () => ({
        url: '/',
        method: 'DELETE',
      }),
      invalidatesTags: ['Mail'],
    }),
    getMails: build.query<IMails, string>({
      query: () => ({
        url: '/cp',
        method: 'GET',
      }),
      providesTags: ['Mail'],
    }),
  }),
});

export const {
  useAddMailsMutation,
  useSendFileToMailMutation,
  useFeedbackMutation,
  useDeleteMailsMutation,
  useGetMailsQuery,
} = mailAPI;
