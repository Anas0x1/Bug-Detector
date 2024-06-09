import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from './axios-instance';

export const send = createAsyncThunk(
    'message/send',
    async (userData) => {
        try {
            // const response = await axios.post('https://humble-meme-979499pgp76q3pq76-5220.app.github.dev/api/Account/Register', userData, {
            const response = await axiosInstance.post('https://localhost:5220/api/Account/ReceiveUserMessage', userData, {
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

const messageSlice = createSlice({
    name: 'message',
    initialState: {
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(send.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(send.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
            })
            .addCase(send.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});

export default messageSlice.reducer;
