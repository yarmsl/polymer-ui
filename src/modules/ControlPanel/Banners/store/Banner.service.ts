import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { SERVER_URL } from '~/lib/constants';
import { RootState } from '~/store';

export const bannerAPI = createApi({
  reducerPath: 'bannerAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/api/banner`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Banner', 'BottomBanner'],
  endpoints: (build) => ({
    addBanner: build.mutation<IBanner, FormData>({
      query: (bannerData) => ({
        url: '/',
        method: 'POST',
        body: bannerData,
      }),
      invalidatesTags: ['Banner'],
    }),
    editBanner: build.mutation<IBanner, IEditBanner>({
      query: (editBannerData) => ({
        url: `/${editBannerData.id}`,
        method: 'PUT',
        body: editBannerData.data,
      }),
      invalidatesTags: ['Banner'],
    }),
    deleteBanner: build.mutation<IMessage, string>({
      query: (bannerId) => ({
        url: `/${bannerId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Banner'],
    }),
    getAllBanners: build.query<IBanner[], string>({
      query: () => ({
        url: '/',
        method: 'GET',
      }),
      providesTags: ['Banner'],
    }),
    editBottomBanner: build.mutation<IMessage, IEditBottomBanner>({
      query: (editBottomBannerReq) => ({
        url: '/bottom',
        method: 'POST',
        body: editBottomBannerReq,
      }),
      invalidatesTags: ['BottomBanner'],
    }),
    getBottomBanner: build.query<IBottomBanner, string>({
      query: () => ({
        url: '/bottom',
        method: 'GET',
      }),
      providesTags: ['BottomBanner'],
    }),
  }),
});

export const {
  useAddBannerMutation,
  useDeleteBannerMutation,
  useEditBannerMutation,
  useGetAllBannersQuery,
  useEditBottomBannerMutation,
  useGetBottomBannerQuery,
} = bannerAPI;
