import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from './axios-instance';


export const fetchAllReports = createAsyncThunk(
    'user/fetchAllReports',
    async () => {
        try {
            // const response = await axios.post('https://humble-meme-979499pgp76q3pq76-5220.app.github.dev/api/Account/Register', userData, {
            // const response = await axiosInstance.post('https://localhost:7268/api/Scan/ReturnReportsForUser', {
            const response = await axiosInstance.post('https://laughing-halibut-x5wqwwjg6jqq249j-5220.app.github.dev/api/Scan/ReturnReportsForUser', {
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
export const getReport = createAsyncThunk(
    'user/getReport',
    async (reportid) => {
        try {
            // const response = await axiosInstance.post('https://expert-couscous-r4gvggj5jg993wwrr-5220.app.github.dev/api/Blogs/ReturnOneBlog', blogid);
            // const response = await axiosInstance.post('https://localhost:7268/api/Scan/ReturnOneReport', reportid, {
            const response = await axiosInstance.post('https://laughing-halibut-x5wqwwjg6jqq249j-5220.app.github.dev/api/Scan/ReturnOneReport', reportid, {
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

const userSlice = createSlice({
    name: 'user',
    initialState: {
        report: {},
        reports: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllReports.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllReports.fulfilled, (state, action) => {
                state.loading = false;
                state.reports = action.payload.map(report => ({
                    reportId: report.reportId,
                    targit: report.targit,
                    type: report.type,
                    dateTime: report.dateTime,
                    result: report.result,
                }));
            })
            .addCase(fetchAllReports.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getReport.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getReport.fulfilled, (state, action) => {
                state.loading = false;
                state.report = action.payload
            })
            .addCase(getReport.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const selectAllReports = (state) => state.user.reports;
export const selectReportsLoading = (state) => state.user.loading;
export const selectOneReport = (state) => state;

export default userSlice.reducer;
