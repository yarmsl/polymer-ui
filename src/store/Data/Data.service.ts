import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { SERVER_URL } from '~/lib/constants';

export const dataAPI = createApi({
  reducerPath: 'dataAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/api`,
  }),
  endpoints: (build) => ({
    getProjectsData: build.query<IProjectFull[], string>({
      query: () => ({
        url: '/project',
        method: 'GET',
      }),
    }),
    getTagsData: build.query<ITagFull[], string>({
      query: () => ({
        url: '/tag',
        method: 'GET',
      }),
    }),
    getCustomersData: build.query<ICustomerFull[], string>({
      query: () => ({
        url: '/customer',
        method: 'GET',
      }),
    }),
    getArticlesData: build.query<IArticle[], string>({
      query: () => ({
        url: '/article',
        method: 'GET',
      }),
    }),
    getProductionArticlesData: build.query<IProductionArticle[], string>({
      query: () => ({
        url: '/production/article',
        method: 'GET',
      }),
    }),
    getStoriesData: build.query<IStory[], string>({
      query: () => ({
        url: '/story',
        method: 'GET',
      }),
    }),
    getStoryArticlesData: build.query<IStoryArticle[], string>({
      query: () => ({
        url: '/storyarticle',
        method: 'GET',
      }),
    }),
    getVacanciesData: build.query<IVacancy[], string>({
      query: () => ({
        url: '/vacancy',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetCustomersDataQuery,
  useGetProjectsDataQuery,
  useGetTagsDataQuery,
  useGetArticlesDataQuery,
  useGetProductionArticlesDataQuery,
  useGetStoriesDataQuery,
  useGetStoryArticlesDataQuery,
  useGetVacanciesDataQuery,
} = dataAPI;
