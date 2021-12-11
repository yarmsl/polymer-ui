import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "..";
import { SERVER_URL } from "../../lib/constants";

export const articleAPI = createApi({
  reducerPath: "articleAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/api/article`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Article"],
  endpoints: (build) => ({
    addArticle: build.mutation<IArticleFull, FormData>({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Article"],
    }),
    editArticle: build.mutation<IArticleFull, IEditArticle>({
      query: (data) => ({
        url: `/${data.id}`,
        method: "PUT",
        body: data.data,
      }),
      invalidatesTags: ["Article"],
    }),
    deleteArticle: build.mutation<IMessage, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Article"],
    }),
    getAllArticles: build.query<IArticleFull[], string>({
      query: () => ({
        url: "/cp",
        method: "GET",
      }),
      providesTags: ["Article"],
    }),
  }),
});

export const {
  useAddArticleMutation,
  useEditArticleMutation,
  useDeleteArticleMutation,
  useGetAllArticlesQuery,
} = articleAPI;
