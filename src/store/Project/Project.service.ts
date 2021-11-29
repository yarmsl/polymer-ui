import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "..";
import { SERVER_URL } from "../../lib/constants";

export const projectAPI = createApi({
  reducerPath: "projectAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/api/project`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Project"],
  endpoints: (build) => ({
    addCustomer: build.mutation<IProject, FormData>({
      query: (projectData) => ({
        url: "/",
        method: "POST",
        body: projectData,
      }),
      invalidatesTags: ["Project"],
    }),
    editCustomer: build.mutation<IProject, IEditProject>({
      query: (editTagData) => ({
        url: `/${editTagData.id}`,
        method: "PUT",
        body: editTagData.data,
      }),
      invalidatesTags: ["Project"],
    }),
    deleteCuscomer: build.mutation<IMessage, string>({
      query: (projectId) => ({
        url: `/${projectId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Project"],
    }),
    getAllCustomers: build.query<ITag[], string>({
      query: () => ({
        url: "/cp",
        method: "GET",
      }),
      providesTags: ["Project"],
    }),
  }),
});

export const {
  useAddCustomerMutation,
  useEditCustomerMutation,
  useDeleteCuscomerMutation,
  useGetAllCustomersQuery,
} = projectAPI;
