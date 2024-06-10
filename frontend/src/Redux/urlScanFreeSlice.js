import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { axiosInstance } from './axios-instance';
export const scanUrl = createAsyncThunk(
  'urlScan/scanUrl',
  async (url) => {
    try {
      // const response = await axiosInstance.post('https://humble-meme-979499pgp76q3pq76-5220.app.github.dev/api/Scan/FreeWebScan', {
      // const response = await axiosInstance.post('https://localhost:7268/api/Scan/FreeWebScan', {
      const response = await axiosInstance.post('https://musical-dollop-gwp67pwxp67cpgj7-5220.app.github.dev/api/Scan/FreeWebScan', {
        url
      }, {
        headers: {
          'Content-Type': 'application/json',
         
        }
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  result: null,
  status: 'idle',
  error: null
};

const urlScanSlice = createSlice({
  name: 'urlScan',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(scanUrl.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(scanUrl.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.result = action.payload;
      })
      .addCase(scanUrl.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default urlScanSlice.reducer;
