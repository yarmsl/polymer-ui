import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "..";
import { SERVER_URL } from "../../lib/constants";

export const tagAPI = createApi({
  reducerPath: "tagAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/api/tag`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Tag"],
  endpoints: (build) => ({
    addCustomer: build.mutation<ITag, IAddTag>({
      query: (tagData) => ({
        url: "/",
        method: "POST",
        body: tagData,
      }),
      invalidatesTags: ["Tag"],
    }),
    editCustomer: build.mutation<ITag, IEditTag>({
      query: (editTagData) => ({
        url: `/${editTagData.id}`,
        method: "PUT",
        body: editTagData.data,
      }),
      invalidatesTags: ["Tag"],
    }),
    deleteCuscomer: build.mutation<IMessage, string>({
      query: (tagId) => ({
        url: `/${tagId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tag"],
    }),
    getAllCustomers: build.query<ITag[], string>({
      query: () => ({
        url: "/cp",
        method: "GET",
      }),
      providesTags: ["Tag"],
    }),
  }),
});

export const {
  useAddCustomerMutation,
  useEditCustomerMutation,
  useDeleteCuscomerMutation,
  useGetAllCustomersQuery,
} = tagAPI;
