import { TLoginSchema } from "@/lib/validationSchemas/LoginSchema";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import { setLogout } from "../auth/authSlice";
import { PostsDataType, Username } from "@/lib/interfaces";

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080",
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          {
            url: "/auth/jwt/refresh/",
            method: "POST",
          },
          api,
          extraOptions,
        );
        if (refreshResult.data) {
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(setLogout());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // Login Endpoint
    getToken: builder.mutation<Username, TLoginSchema>({
      query: (loginData) => ({
        url: "/auth/jwt/create/",
        method: "POST",
        body: loginData,
      }),
    }),
    // Post List
    getPosts: builder.query<PostsDataType, void>({
      query: () => "/posts/list/",
    }),
  }),
});

export const { useGetTokenMutation, useGetPostsQuery } = apiSlice;
