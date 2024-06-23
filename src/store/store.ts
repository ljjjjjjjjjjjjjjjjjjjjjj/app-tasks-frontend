import { configureStore } from '@reduxjs/toolkit';
import currentPageReducer from './currentPageSlice';

const store = configureStore({
  reducer: {
    currentPage: currentPageReducer,
  }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;