import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import pokemonReducer from "./features/pokemonSlice";
import { userApi } from "./services/userApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { pokemonApi } from "./services/pokemonApi";

export const store = configureStore({
  reducer: {
    counterReducer,
    pokemonReducer,
    [userApi.reducerPath]: userApi.reducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(
      [
        userApi.middleware,
        pokemonApi.middleware
      ]
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;