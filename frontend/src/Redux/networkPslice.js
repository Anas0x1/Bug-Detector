
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from './axios-instance';

export const scanPremiumNetwork = createAsyncThunk(
  'networkScan/scan',
  async (url) => {
    try {
      // const response = await axiosInstance.post("https://localhost:7268/api/Scan/PremiumNetworkScan", {
      // const response = await axiosInstance.post("https://localhost:5220/api/Scan/PremiumNetworkScan", {
      const response = await axiosInstance.post("https://musical-dollop-gwp67pwxp67cpgj7-5220.app.github.dev/api/Scan/PremiumNetworkScan", {
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

const networkPSlice = createSlice({
  name: 'networkPScan',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(scanPremiumNetwork.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(scanPremiumNetwork.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.result = action.payload;
      })
      .addCase(scanPremiumNetwork.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default networkPSlice.reducer;
