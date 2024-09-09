import { TLoginSchema } from "@/lib/validationSchemas/LoginSchema";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import { setLogout } from "../auth/authSlice";
import { PostsDataType, TMailSchema, Username } from "@/lib/interfaces";
import { TRegisterUserSchema } from "@/lib/validationSchemas/RegisterSchema";
import { TPasswordResetConfirmSchema } from "@/lib/validationSchemas/PasswordResetConfirmSchema";

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
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    // Login Endpoint
    getToken: builder.mutation<Username, TLoginSchema>({
      query: (loginData) => ({
        url: "/auth/jwt/create/",
        method: "POST",
        body: loginData,
      }),
    }),

    // Delete all http-only Cookie Token
    deleteToken: builder.mutation<null, void>({
      query: () => ({
        url: "/auth/jwt/delete/",
        method: "POST",
      }),
    }),

    // User Creation Endpoint
    createUser: builder.mutation<null, TRegisterUserSchema>({
      query: (registerData) => ({
        url: "/users/",
        method: "POST",
        body: registerData,
      }),
    }),

    // Resend Activation Mail
    resendActivationMail: builder.mutation<null, TMailSchema>({
      query: (email) => ({
        url: "/users/resend_activation/",
        method: "POST",
        body: email,
      }),
    }),

    // Reset Password Request
    resetPasswordRequest: builder.mutation<null, TMailSchema>({
      query: (email) => ({
        url: "/users/reset_password/",
        method: "POST",
        body: email,
      }),
    }),

    // Reset Password Confirmation
    resetPasswordConfirmation: builder.mutation<
      null,
      TPasswordResetConfirmSchema
    >({
      query: (confirmationData) => ({
        url: "/users/reset_password_confirm/",
        method: "POST",
        body: confirmationData,
      }),
    }),

    // Post List
    getPosts: builder.query<PostsDataType, number | void>({
      query: (page) => `/posts/list/?page=${page}`,
      providesTags: (result, error, page) => {
        return result
          ? [
              ...result.results.map(({ id }) => {
                return { type: "Post" as const, id };
              }),
              { type: "Post", id: "PARTIAL-LIST" },
            ]
          : [{ type: "Post", id: "PARTIAL-LIST" }];
      },
    }),
  }),
});

export const {
  useGetTokenMutation,
  useGetPostsQuery,
  useDeleteTokenMutation,
  useCreateUserMutation,
  useResendActivationMailMutation,
  useResetPasswordConfirmationMutation,
  useResetPasswordRequestMutation,
} = apiSlice;
