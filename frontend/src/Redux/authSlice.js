import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials) => {
    try {
      const response = await axios.post("https://localhost:7268/api/Account/Login", credentials, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const { user, token } = response.data;
      localStorage.setItem('authToken', token);

      return { user, token };
    } catch (error) {
      throw error;
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData) => {
    try {
      const response = await axios.post('https://localhost:7268/api/Account/Register', userData, {
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

// New thunk for generating OTP
export const generateOTP = createAsyncThunk(
  'auth/generateOTP',
  async (email) => {
    try {
      const response = await axios.post('https://localhost:7268/api/Account/GenerateAnOTP', { email }, {
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

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('authToken'), 
    loading: false,
    error: null
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('authToken'); 
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add extra reducers for generateOTP
      .addCase(generateOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateOTP.fulfilled, (state) => {
        state.loading = false;
        // You can handle OTP generation success here if needed
      })
      .addCase(generateOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
