import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { SERVER_URL } from '~/lib/constants';
import { RootState } from '~/store';

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/api/auth`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    signIn: build.mutation<IUser, formSignIn>({
      query: (signData) => ({
        url: '/signin',
        method: 'POST',
        body: signData,
      }),
    }),
    checkAuth: build.query<IUser, string>({
      query: () => ({
        url: '/',
      }),
    }),
  }),
});

export const { useSignInMutation, useCheckAuthQuery } = authAPI;
