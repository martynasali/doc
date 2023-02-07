import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import uploaderReducer from "./features/uploader/uploaderSlice";
import showSliceReducer from "./features/show/showSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    uploader: uploaderReducer,
    show: showSliceReducer
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
