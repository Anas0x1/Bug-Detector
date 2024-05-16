import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const userIsPremium = true; 

export const scanPrUrl = createAsyncThunk(
  'urlScan/scanUrl',
  async (url) => {
    if (!userIsPremium) {
     
      throw new Error('Premium account required for scanning');
    }

    try {
      const response = await fetch('https://localhost:7268/api/Scan/PremiumWebScan', {
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

const urlScanPSlice = createSlice({
  name: 'urlScan',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(scanPrUrl.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(scanPrUrl.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.result = action.payload;
      })
      .addCase(scanPrUrl.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default urlScanPSlice.reducer;
