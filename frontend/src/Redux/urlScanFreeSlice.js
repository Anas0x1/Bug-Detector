// urlScanSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const scanUrl = createAsyncThunk(
  'urlScan/scanUrl',
  async (url) => {
    const response = await fetch(`https://upgraded-spork-r5w955wxwqqhx55p-5220.app.github.dev/api/Scan/FreeWebScan?url=${url}`);
    const data = await response.json();
    return data;
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
