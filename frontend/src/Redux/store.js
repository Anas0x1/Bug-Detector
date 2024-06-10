import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import blogsReducer from './blogsSlice'; // Import the blogsSlice reducer
import commentReducer from './commentSlice';
import urlScanReducer from "./urlScanFreeSlice";
import urlScanPReducer from "./urlScanPSlice";
import networkScanReducer from "./networkFreeSlice";
import networkPSliceReducer from './networkPslice';
import messageSliceReducer from './messageSlice';
import userSliceReducer from './userSlice';
import SourcecodeURLReducer from './sourcecodescan';
const store = configureStore({
  reducer: {
    auth: authReducer,
    blogs: blogsReducer, 
    comment: commentReducer, 
    urlScan: urlScanReducer,
    urlPscan: urlScanPReducer,
    networkScan: networkScanReducer,
    networkPScan: networkPSliceReducer,
    message:messageSliceReducer,
    user:userSliceReducer,
    sourcecodeURL:SourcecodeURLReducer,
  }
});

export default store;
