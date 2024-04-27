
import { configureStore } from '@reduxjs/toolkit';
import counterRedcuer from './slice';
export const store=configureStore({

    reducer:{
        counter:counterRedcuer,

    },
    devTools:true
});