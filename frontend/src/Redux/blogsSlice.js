import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const addNewBlog = createAsyncThunk(
  'blogs/addNewBlog',
  async (blogData) => {
    try {
      const response = await axios.post('https://redesigned-spork-wr7j77wq6w6gf5g6j-5220.app.github.dev/api/Blogs/AddBlog', blogData);
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
      const response = await axios.get('https://redesigned-spork-wr7j77wq6w6gf5g6j-5220.app.github.dev/api/Blogs/ReturnAllBlogs');
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
      });
  }
});

export const selectAllBlogs = (state) => state.blogs.blogs;
export const selectBlogsLoading = (state) => state.blogs.loading;
export const selectBlogsError = (state) => state.blogs.error;

export default blogSlice.reducer;
