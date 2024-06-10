import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from './axios-instance';
export const urlScanPSlice = createAsyncThunk(
  'urlScanPSlice/urlScanPSlice',
  async (url) => {
    try {
      const response = await axiosInstance.post('https://laughing-halibut-x5wqwwjg6jqq249j-5220.app.github.dev/api/Scan/FreeWebScan', {
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

const urlScanPPSlice= createSlice({
  name: 'urlScan',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(urlScanPSlice.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(urlScanPSlice.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.result = action.payload;
      })
      .addCase(urlScanPSlice.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default urlScanPPSlice.reducer;
