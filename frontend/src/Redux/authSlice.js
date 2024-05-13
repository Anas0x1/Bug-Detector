import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { axiosInstance } from './axios-instance';
import axios from 'axios';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials) => {
    try {
      const response = await axios.post("https://potential-computing-machine-q7qgqqw5w77wfx6w6-5220.app.github.dev/api/Account/Login", credentials, {
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
      const response = await axiosInstance.post('https://sturdy-garbanzo-wr7j77wq66vx3944x-5220.app.github.dev/api/Account/Register', userData, {
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
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
