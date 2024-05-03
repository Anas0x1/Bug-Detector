// networkScanSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const scanNetwork = createAsyncThunk(
  'networkScan/scan',
  async (url) => {
    try {
      const response = await fetch("https://upgraded-spork-r5w955wxwqqhx55p-5220.app.github.dev/api/Scan/FreeNetworkScan", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      
      return data;
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
        state.result = action.payload;
      })
      .addCase(scanNetwork.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default networkScanSlice.reducer;
