import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "..";
import { SERVER_URL } from "../../lib/constants";

export const projectAPI = createApi({
  reducerPath: "projectAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/api/project`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Project"],
  endpoints: (build) => ({
    addProject: build.mutation<IProject, FormData>({
      query: (projectData) => ({
        url: "/",
        method: "POST",
        body: projectData,
      }),
      invalidatesTags: ["Project"],
    }),
    editProject: build.mutation<IProject, IEditProject>({
      query: (editTagData) => ({
        url: `/${editTagData.id}`,
        method: "PUT",
        body: editTagData.data,
      }),
      invalidatesTags: ["Project"],
    }),
    deleteProject: build.mutation<IMessage, string>({
      query: (projectId) => ({
        url: `/${projectId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Project"],
    }),
    getAllProjects: build.query<ITag[], string>({
      query: () => ({
        url: "/cp",
        method: "GET",
      }),
      providesTags: ["Project"],
    }),
  }),
});

export const {
  useAddProjectMutation,
  useEditProjectMutation,
  useDeleteProjectMutation,
  useGetAllProjectsQuery,
} = projectAPI;
