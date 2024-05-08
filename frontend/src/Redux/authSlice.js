import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const login = createAsyncThunk(
  'auth/login',
  async (credentials) => {
    try {
      const response = await fetch('https://redesigned-spork-wr7j77wq6w6gf5g6j-5220.app.github.dev/api/Account/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        throw new Error('Failed to login');
      }

      const data = await response.json();
      const { user, token } = data; 

     
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
      const response = await fetch('https://redesigned-spork-wr7j77wq6w6gf5g6j-5220.app.github.dev/api/Account/Register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error('Failed to register');
      }

      const data = await response.json();
      return data;  
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
