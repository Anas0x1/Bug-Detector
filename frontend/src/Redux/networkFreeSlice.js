import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { axiosInstance } from './axios-instance';
export const scanNetwork = createAsyncThunk(
  'networkScan/scan',
  async (url) => {
    try {
      const response = await axiosInstance.post("https://localhost:7268/api/Scan/FreeNetworkScan", {
      // const response = await axiosInstance.post("https://glowing-doodle-xq4xv4qrp6w2699p-5220.app.github.dev/api/Scan/FreeNetworkScan", {
        url
      }, {
        headers: {
          'Content-Type': 'application/json'
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

const networkScanSlice = createSlice({
  name: 'networkScan',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(scanNetwork.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(scanNetwork.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.result = action.payload.result[0];
      })
      .addCase(scanNetwork.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default networkScanSlice.reducer;
