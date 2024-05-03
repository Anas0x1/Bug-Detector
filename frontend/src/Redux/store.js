import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import blogsReducer from './blogsSlice'; 
import urlScanReducer from "./urlScanFreeSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    blogs: blogsReducer,
    urlScan: urlScanReducer,
  }
});

export default store;
