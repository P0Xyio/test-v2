import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { authSlice } from "@/features/authSlice";
import { authApi } from "@/services/authApi";

const rootReducer = combineSlices(authSlice, authApi);

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware),
    preloadedState,
  });

  return store;
};

export const store = makeStore();
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
