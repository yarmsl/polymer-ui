import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "..";
import { SERVER_URL } from "../../lib/constants";

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/api/auth`,
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as RootState).auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    }
  }),
  endpoints: (build) => ({
    signIn: build.mutation<ISignInResponse, formLogin>({
      query: (signData) => ({
        url: "/signin",
        method: "POST",
        body: signData,
      }),
    }),
    signUp: build.mutation<ISignUpResponse, formLogin>({
      query: (signData) => ({
        url: "/signup",
        method: "POST",
        body: signData,
      }),
    }),
    checkAuth: build.query<IUser, string>({
      query: () => ({
        url: "/checkauth",
      })
    })
  }),
});

export const { useSignInMutation, useSignUpMutation, useCheckAuthQuery } = authAPI;
