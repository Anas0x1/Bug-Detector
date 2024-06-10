import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { axiosInstance } from './axios-instance';
export const sourcecodeURL = createAsyncThunk(
  'sourcecodeURL/sourcecodeURL',
  async (url) => {
    try {
   
      // const response = await axiosInstance.post('https://musical-dollop-gwp67pwxp67cpgj7-5220.app.github.dev/api/SourceCodeScan/SourceCodeScan', {
      const response = await axiosInstance.post('https://localhost:7268/api/SourceCodeScan/SourceCodeScan', {
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

const SourcecodeURL = createSlice({
  name: 'sourcecodeURL',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sourcecodeURL.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(sourcecodeURL.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.result = action.payload.result;
      })
      .addCase(sourcecodeURL.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default SourcecodeURL.reducer;
