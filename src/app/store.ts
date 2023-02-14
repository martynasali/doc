import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import uploaderReducer from "./features/uploader/uploaderSlice";

export const store = configureStore({
  reducer: {
    uploader: uploaderReducer,
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
