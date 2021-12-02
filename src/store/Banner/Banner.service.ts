import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "..";
import { SERVER_URL } from "../../lib/constants";

export const bannerAPI = createApi({
  reducerPath: "bannerAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/api/banner`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Banner"],
  endpoints: (build) => ({
    addBanner: build.mutation<IBanner, FormData>({
      query: (bannerData) => ({
        url: "/",
        method: "POST",
        body: bannerData,
      }),
      invalidatesTags: ["Banner"],
    }),
    editBanner: build.mutation<IBanner, IEditBanner>({
      query: (editBannerData) => ({
        url: `/${editBannerData.id}`,
        method: "PUT",
        body: editBannerData.data,
      }),
      invalidatesTags: ["Banner"],
    }),
    deleteBanner: build.mutation<IMessage, string>({
      query: (bannerId) => ({
        url: `/${bannerId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Banner"],
    }),
    getAllBanners: build.query<IBanner[], string>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["Banner"],
    }),
  }),
});

export const {
  useAddBannerMutation,
  useDeleteBannerMutation,
  useEditBannerMutation,
  useGetAllBannersQuery,
} = bannerAPI;
