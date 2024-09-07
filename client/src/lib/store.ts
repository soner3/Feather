import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import sidebarSlice from "./features/sidebar/sidebarSlice";
import { apiSlice } from "./features/api/apiSlice";
import { listenerMiddleware } from "./listenerMiddleware";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
      sidebar: sidebarSlice,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .prepend(listenerMiddleware.middleware)
        .concat(apiSlice.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
