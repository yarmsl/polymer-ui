import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "..";
import { SERVER_URL } from "../../lib/constants";

export const usersAPI = createApi({
  reducerPath: "usersAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/api/user`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (build) => ({
    signUp: build.mutation<{ message: string }, formSignUp>({
      query: (signData) => ({
        url: "/signup",
        method: "POST",
        body: signData,
      }),
      invalidatesTags: ['User']
    }),
    editUserById: build.mutation<{ message: string }, IEditUserById>({
      query: (data) => ({
        url: "/",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ['User']
    }),
    changePassword: build.mutation<{ message: string }, IEditPassword>({
      query: (data) => ({
        url: `/${data.id}`,
        method: "PUT",
        body: { password: data.password },
      }),
    }),
    getAllUsers: build.query<IUserResponse[], string>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ['User']
    }),
    removeUser: build.mutation<{ message: string }, IDeleteUser>({
      query: (data) => ({
        url: `/${data.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['User']
    }),
  }),
});

export const {
  useSignUpMutation,
  useEditUserByIdMutation,
  useChangePasswordMutation,
  useGetAllUsersQuery,
  useRemoveUserMutation,
} = usersAPI;
