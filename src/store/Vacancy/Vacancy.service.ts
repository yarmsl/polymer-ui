import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "..";
import { SERVER_URL } from "../../lib/constants";

export const vacancyAPI = createApi({
  reducerPath: "vacancyAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/api/vacancy`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Vacancy"],
  endpoints: (build) => ({
    addVacancy: build.mutation<IVacancyFull, IAddVacancy>({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Vacancy"],
    }),
    editVacancy: build.mutation<IVacancyFull, IEditVacancy>({
      query: (data) => ({
        url: `/${data.id}`,
        method: "PUT",
        body: data.data,
      }),
      invalidatesTags: ["Vacancy"],
    }),
    deleteVacancy: build.mutation<IMessage, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Vacancy"],
    }),
    getAllVacancies: build.query<IVacancyFull[], string>({
      query: () => ({
        url: "/cp",
        method: "GET",
      }),
      providesTags: ["Vacancy"],
    }),
  }),
});

export const {
  useAddVacancyMutation,
  useEditVacancyMutation,
  useDeleteVacancyMutation,
  useGetAllVacanciesQuery,
} = vacancyAPI;
