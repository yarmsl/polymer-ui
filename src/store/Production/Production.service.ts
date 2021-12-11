import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "..";
import { SERVER_URL } from "../../lib/constants";

export const productionAPI = createApi({
  reducerPath: "productionAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/api/production`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Production"],
  endpoints: (build) => ({
    addProductionArticle: build.mutation<IProductionArticleFull, IAddProductionArticle>({
      query: (data) => ({
        url: "/article",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Production"],
    }),
    editProductionArticle: build.mutation<
      IProductionArticleFull,
      IEditProductionArticle
    >({
      query: (data) => ({
        url: `/article/${data.id}`,
        method: "PUT",
        body: data.data,
      }),
      invalidatesTags: ["Production"],
    }),
    deleteProductionArticle: build.mutation<IMessage, string>({
      query: (id) => ({
        url: `/article/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Production"],
    }),
    getAllProductionArticles: build.query<IProductionArticleFull[], string>({
      query: () => ({
        url: "/article/cp",
        method: "GET",
      }),
      providesTags: ["Production"],
    }),
    addProductionStep: build.mutation<IStepFull, FormData>({
      query: (data) => ({
        url: "/step",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Production"],
    }),
    editProductionStep: build.mutation<IStepFull, IEditStep>({
      query: (data) => ({
        url: `/step/${data.id}`,
        method: "PUT",
        body: data.data,
      }),
      invalidatesTags: ["Production"],
    }),
    deleteProductionStep: build.mutation<IMessage, string>({
      query: (id) => ({
        url: `/step/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Production"],
    }),
    getAllSteps: build.query<IStepFull[], string>({
      query: () => ({
        url: "/step/cp",
        method: "GET",
      }),
      providesTags: ["Production"],
    }),
  }),
});

export const {
  useAddProductionArticleMutation,
  useEditProductionArticleMutation,
  useDeleteProductionArticleMutation,
  useGetAllProductionArticlesQuery,
  useAddProductionStepMutation,
  useEditProductionStepMutation,
  useDeleteProductionStepMutation,
  useGetAllStepsQuery,
} = productionAPI;
