import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "..";
import { SERVER_URL } from "../../lib/constants";

export const storyArticleAPI = createApi({
  reducerPath: "storyArticleAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/api/storyarticle`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["StoryArticle"],
  endpoints: (build) => ({
    addStoryArticle: build.mutation<IStoryArticleFull, FormData>({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["StoryArticle"],
    }),
    editStoryArticle: build.mutation<IStoryArticleFull, IEditStoryArticle>({
      query: (data) => ({
        url: `/${data.id}`,
        method: "PUT",
        body: data.data,
      }),
      invalidatesTags: ["StoryArticle"],
    }),
    deleteStoryArticle: build.mutation<IMessage, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["StoryArticle"],
    }),
    getAllStoryArticles: build.query<IStoryArticleFull[], string>({
      query: () => ({
        url: "/cp",
        method: "GET",
      }),
      providesTags: ["StoryArticle"],
    }),
  }),
});

export const {
  useAddStoryArticleMutation,
  useEditStoryArticleMutation,
  useDeleteStoryArticleMutation,
  useGetAllStoryArticlesQuery,
} = storyArticleAPI;
