import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock premium status
const userIsPremium = true; // You can replace this with actual logic to determine the user's premium status

export const scanPrUrl = createAsyncThunk(
  'urlScan/scanUrl',
  async (url) => {
    if (!userIsPremium) {
      // If the user is not premium, redirect to the pricing page or perform any other action
      // For example, you can dispatch an action to set a flag indicating that the user needs to upgrade their account
      throw new Error('Premium account required for scanning');
    }

    try {
      const response = await fetch('https://upgraded-spork-r5w955wxwqqhx55p-5220.app.github.dev/api/Scan/PremiumWebScan', {
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
      console.log('API Response:', data); 
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
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
