import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//import axios from 'axios';
import { axiosInstance } from './axios-instance';


export const addNewBlog = createAsyncThunk(
  'blogs/addNewBlog',
  async (blogData) => {
    try {
      //const response = await axios.post('https://localhost:7268/api/Blogs/AddBlog', blogData);
      const response = await axiosInstance.post('https://congenial-yodel-wr7j77wq66xg3w6j-5220.app.github.dev/api/Blogs/AddBlog', blogData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const addLike = createAsyncThunk(
  'blogs/addlike',
  async (blogid) => {
    try {
      //const response = await axios.post('https://localhost:7268/api/Blogs/AddBlog', blogData);
      const response = await axiosInstance.post('https://congenial-yodel-wr7j77wq66xg3w6j-5220.app.github.dev/api/Blogs/Like', blogid);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const addDislike = createAsyncThunk(
  'blogs/adddislike',
  async (blogid) => {
    try {
      //const response = await axios.post('https://localhost:7268/api/Blogs/AddBlog', blogData);
      const response = await axiosInstance.post('https://congenial-yodel-wr7j77wq66xg3w6j-5220.app.github.dev/api/Blogs/DisLike', blogid);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchAllBlogs = createAsyncThunk(
  'blogs/fetchAllBlogs',
  async () => {
    try {
      //const response = await axios.get('https://localhost:7268/api/Blogs/ReturnAllBlogs');
      const response = await axiosInstance.post('https://congenial-yodel-wr7j77wq66xg3w6j-5220.app.github.dev/api/Blogs/ReturnAllBlogs');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  blogs: [], 
  loading: false,
  error: null
};

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload.map(blog => ({
          id : blog.id,
          usrName : blog.usrName,
          publicationDate : blog.publicationDate,
          numberOfDisLikes : blog.numberOfDisLikes,
          numberOfLikes : blog.numberOfLikes,
          title: blog.title,
          content: blog.content
        }));
      })
      .addCase(fetchAllBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      .addCase(addNewBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewBlog.fulfilled, (state, action) => {
        state.loading = false;

        state.blogs.push(action.payload);
      })
      .addCase(addNewBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addLike.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addLike.fulfilled, (state, action) => {
        state.loading = false;

        state.blogs.push(action.payload);
      })
      .addCase(addLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addDislike.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDislike.fulfilled, (state, action) => {
        state.loading = false;

        state.blogs.push(action.payload);
      })
      .addCase(addDislike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const selectAllBlogs = (state) => state.blogs.blogs;
export const selectBlogsLoading = (state) => state.blogs.loading;
export const selectBlogsError = (state) => state.blogs.error;

export default blogSlice.reducer;
