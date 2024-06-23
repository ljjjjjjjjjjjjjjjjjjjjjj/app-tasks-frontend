import { createSlice } from '@reduxjs/toolkit';
import { AppRoutes } from '../routes/AppRoutes';

const initialState = {
  currentPage: AppRoutes.OVERVIEW 
};

const currentPageSlice = createSlice({
  name: 'currentPage',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    resetCurrentPage: (state) => {
      state.currentPage = AppRoutes.OVERVIEW;
    },
  }
});

export const { setCurrentPage, resetCurrentPage } = currentPageSlice.actions;
export default currentPageSlice.reducer; 