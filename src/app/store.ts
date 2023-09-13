import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import platformSlice from "../redux/platformSlice";

export const store = configureStore({
  reducer: {
    platform: platformSlice,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
