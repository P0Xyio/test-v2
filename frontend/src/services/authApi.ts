// Need to use the React-specific entry point to import `createApi`
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { TRegisterForm, TLoginForm } from "@/lib/schemas";
import type { RootState } from "../app/store";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

type AuthAPIResponse = {
  token: string;
};

type User = {
  name: string;
  email: string;
};

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/user`,
    prepareHeaders: (headers, { getState }) => {
      // Retrieve the token from the Redux state and set it in the Authorization header, if present.
      const state = getState() as RootState;
      if (state.auth.token !== null) {
        headers.set("Authorization", `Bearer ${state.auth.token}`);
      }
    },
  }),
  // Define tag for automatic cache invalidation and updates.

  // it's not best practise to revalidate it on every mutation,
  // but it's good for demonstration/development purposes
  tagTypes: ["User"],
  endpoints: (build) => ({
    register: build.mutation<string, TRegisterForm>({
      query: (data) => ({
        url: "register",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: AuthAPIResponse) => response.token,
      invalidatesTags: ["User"],
    }),
    login: build.mutation<string, TLoginForm>({
      query: (data) => ({
        url: "login",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: AuthAPIResponse) => response.token,
      invalidatesTags: ["User"],
    }),
    getUser: build.query<User, unknown>({
      // we don't need any params, as we're using the token
      query: () => ({
        url: "",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetUserQuery } =
  authApi;
