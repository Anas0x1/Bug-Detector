import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//import axios from 'axios';
import { axiosInstance } from './axios-instance';


export const addNewComment = createAsyncThunk(
    'comment/addNewComment',
    async (commentData) => {
        try {
            //const response = await axios.post('https://localhost:7268/api/Blogs/AddBlog', blogData);
            const response = await axiosInstance.post('https://localhost:7268/api/Comment/AddComment', commentData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);
export const addCommentLike = createAsyncThunk(
    'comment/addlike',
    async (commentid) => {
        try {
            //const response = await axios.post('https://localhost:7268/api/Blogs/AddBlog', blogData);
            const response = await axiosInstance.post('https://localhost:7268/api/Comment/Like', commentid);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);
export const deleteComment = createAsyncThunk(
    'comment/delete',
    async (commentData) => {
        try {
            console.log("commentData")
            console.log(commentData)
            //const response = await axios.post('https://localhost:7268/api/Blogs/AddBlog', blogData);
            const response = await axiosInstance.delete('https://localhost:7268/api/Comment/DeleteComment',
                { data: { blogId: commentData.blogid,commentId: commentData.commentid} }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);
export const addCommentDislike = createAsyncThunk(
    'comment/adddislike',
    async (commentid) => {
        try {
            //const response = await axios.post('https://localhost:7268/api/Blogs/AddBlog', blogData);
            const response = await axiosInstance.post('https://localhost:7268/api/Comment/DisLike', commentid);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);
export const fetchAllComment = createAsyncThunk(
    'comment/fetchAllComment',
    async (blogId) => {
        try {
            //const response = await axios.post('https://localhost:7268/api/Blogs/AddBlog', blogData);
            const response = await axiosInstance.post('https://localhost:7268/api/Comment/ReturnCommentsForBlog', blogId);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);



const initialState = {
    comments: [],
    likes: null,
    dislikes: null,
    delete: null,
    loading: false,
    error: null
};

const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllComment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllComment.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = action.payload.map(comment => ({
                    id: comment.id,
                    usrName: comment.usrName,
                    publicationDate: comment.publicationDate,
                    numberOfDisLikes: comment.numberOfDisLikes,
                    numberOfLikes: comment.numberOfLikes,
                    content: comment.content
                }));
            })
            .addCase(fetchAllComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addCommentLike.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addCommentLike.fulfilled, (state, action) => {
                state.loading = false;

                state.likes = action.payload;
            })
            .addCase(addCommentLike.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addCommentDislike.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addCommentDislike.fulfilled, (state, action) => {
                state.loading = false;

                state.dislikes = action.payload;
            })
            .addCase(addCommentDislike.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteComment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.loading = false;

                state.delete = action.payload;
            })
            .addCase(deleteComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addNewComment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addNewComment.fulfilled, (state, action) => {
                state.loading = false;

                state.comments.push(action.payload);
            })
            .addCase(addNewComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const selectAllComments = (state) => state.comment.comments;
export const selectCommentsLoading = (state) => state.comment.loading;
export const selectCommentsError = (state) => state.comment.error;

export default commentSlice.reducer;
