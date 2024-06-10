import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from './axios-instance';

const userIsPremium = true; 

// export const scanPrUrl = createAsyncThunk(
//   'urlScan/scanUrl',
//   async (url) => {
//     if (!userIsPremium) {
     
//       throw new Error('Premium account required for scanning');
//     }

//     try {
//       const response = await fetch('https://musical-dollop-gwp67pwxp67cpgj7-5220.app.github.dev/api/Scan/PremiumWebScan', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ url })
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch data');
//       }

//       const data = await response.json();
      
//       return data;
//     } catch (error) {
     
//       throw error;
//     }
//   }
// );


export const scanPrUrl = createAsyncThunk(
  'urlScan/scanUrl',
  async (url) => {
    try {
      // const response = await axiosInstance.post('https://humble-meme-979499pgp76q3pq76-5220.app.github.dev/api/Scan/PremiumWebScan', {
      // const response = await axiosInstance.post('https://localhost:7268/api/Scan/PremiumWebScan', {
      const response = await axiosInstance.post('https://musical-dollop-gwp67pwxp67cpgj7-5220.app.github.dev/api/Scan/PremiumWebScan', {
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
