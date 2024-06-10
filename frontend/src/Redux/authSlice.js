import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { axiosInstance } from './axios-instance';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials) => {
    try {
      const response = await axios.post("https://laughing-halibut-x5wqwwjg6jqq249j-5220.app.github.dev/api/Account/Login", credentials, {
      // const response = await axios.post("https://localhost:7268/api/Account/Login", credentials, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const { userName, token, roles } = response.data;
      localStorage.setItem('authToken', token);
      localStorage.setItem('UserName', userName);
      localStorage.setItem('Roles', roles);

      return { userName, token };
    } catch (error) {
      throw error;
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData) => {
    try {
      const response = await axios.post('https://musical-dollop-gwp67pwxp67cpgj7-5220.app.github.dev/api/Account/Register', userData, {
        // const response = await axios.post('https://localhost:7268/api/Account/Register', userData, {
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

export const changepassword = createAsyncThunk(
  'auth/changepassword',
  async (userData) => {
    try {
      // const response = await axios.post('https://humble-meme-979499pgp76q3pq76-5220.app.github.dev/api/Account/Register', userData, {
      // const response = await axiosInstance.post('https://localhost:7268/api/Account/ChangePassword', userData, {
      const response = await axiosInstance.post('http://localhost:5220/api/Account/ChangePassword', userData, {
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

export const forgetpassword = createAsyncThunk(
  'auth/forgetpassword',
  async (userData) => {
    try {
      const response = await axios.post('https://musical-dollop-gwp67pwxp67cpgj7-5220.app.github.dev/api/Account/Register', userData, {
        // const response = await axios.post('https://localhost:7268/api/Account/ForgotPassword', userData, {
        // const response = await axios.post('http://localhost:5220/api/Account/ForgotPassword', userData, {
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
      // const response = await axios.post('https://glowing-doodle-xq4xv4qrp6w2699p-5220.app.github.dev/api/Account/GenerateAnOTP', { email }, {
      // const response = await axios.post('https://localhost:7268/api/Account/GenerateAnOTP', { email }, {
      const response = await axios.post('https://musical-dollop-gwp67pwxp67cpgj7-5220.app.github.dev/api/Account/GenerateAnOTP', { email }, {
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
export const generateOTPforForgetPassword = createAsyncThunk(
  'auth/generateOTPforForgetPassword',
  async (email) => {
    try {
      const response = await axios.post('https://musical-dollop-gwp67pwxp67cpgj7-5220.app.github.dev/api/Account/GenerateAnOTP', { email }, {
        // const response = await axios.post('https://localhost:7268/api/Account/GenerateAnOTPForForgotPassword', { email }, {
        // const response = await axios.post('http://localhost:5220/api/Account/GenerateAnOTPForForgotPassword', { email }, {
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
    user: localStorage.getItem('UserName'),
    token: localStorage.getItem('authToken'),
    type: localStorage.getItem('Roles'),
    loading: false,
    error: null
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('authToken');
      localStorage.removeItem('UserName');
      localStorage.removeItem('Roles');
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
        state.user = action.payload.userName;
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

      .addCase(generateOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateOTP.fulfilled, (state) => {
        state.loading = false;

      })
      .addCase(generateOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(generateOTPforForgetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateOTPforForgetPassword.fulfilled, (state) => {
        state.loading = false;

      })
      .addCase(generateOTPforForgetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(forgetpassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgetpassword.fulfilled, (state) => {
        state.loading = false;

      })
      .addCase(forgetpassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(changepassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changepassword.fulfilled, (state) => {
        state.loading = false;

      })
      .addCase(changepassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
