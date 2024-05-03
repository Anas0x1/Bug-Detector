import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import blogsReducer from './blogsSlice'; 
import urlScanReducer from "./urlScanFreeSlice";
import urlScanPReducer from "./urlScanPSlice"
const store = configureStore({
  reducer: {
    auth: authReducer,
    blogs: blogsReducer,
    urlScan: urlScanReducer,
    urlPscan:urlScanPReducer,
  }
});

export default store;
