import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_URL } from "../../lib/constants";

export const dataAPI = createApi({
  reducerPath: "dataAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/api`,
  }),
  tagTypes: ["Project", "Tag", "Customer", "File"],
  endpoints: (build) => ({
    getProjectsData: build.query<IProjectFull[], string>({
      query: () => ({
        url: "/project",
        method: "GET",
      }),
      providesTags: ["Project", "Tag", "Customer"],
    }),
    getTagsData: build.query<ITagFull[], string>({
      query: () => ({
        url: "/tag",
        method: "GET",
      }),
      providesTags: ["Project", "Tag", "Customer"],
    }),
    getCustomersData: build.query<ICustomerFull[], string>({
      query: () => ({
        url: "/customer",
        method: "GET",
      }),
      providesTags: ["Project", "Tag", "Customer"],
    }),
    getPresentationFile: build.query<IPresFile, string>({
      query: () => ({
        url: "/file",
        method: "GET",
      }),
      providesTags: ["File"],
    }),
  }),
});

export const {
  useGetCustomersDataQuery,
  useGetProjectsDataQuery,
  useGetTagsDataQuery,
  useGetPresentationFileQuery,
} = dataAPI;
