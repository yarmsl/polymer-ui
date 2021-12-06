import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "..";
import { SERVER_URL } from "../../lib/constants";

export const customerAPI = createApi({
  reducerPath: "customerAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/api/customer`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Customer"],
  endpoints: (build) => ({
    addCustomer: build.mutation<ICustomer, FormData>({
      query: (customerData) => ({
        url: "/",
        method: "POST",
        body: customerData,
      }),
      invalidatesTags: ["Customer"],
    }),
    editCustomer: build.mutation<ICustomer, IEditCustomer>({
      query: (editCustomerData) => ({
        url: `/${editCustomerData.id}`,
        method: "PUT",
        body: editCustomerData.data,
      }),
      invalidatesTags: ["Customer"],
    }),
    deleteCustomer: build.mutation<IMessage, string>({
      query: (customerId) => ({
        url: `/${customerId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Customer"],
    }),
    getAllCustomers: build.query<ICustomerFull[], string>({
      query: () => ({
        url: "/cp",
        method: "GET",
      }),
      providesTags: ["Customer"],
    }),
  }),
});

export const {
  useAddCustomerMutation,
  useDeleteCustomerMutation,
  useEditCustomerMutation,
  useGetAllCustomersQuery,
} = customerAPI;
