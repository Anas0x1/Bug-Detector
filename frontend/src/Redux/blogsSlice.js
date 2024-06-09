import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//import axios from 'axios';
import { axiosInstance } from './axios-instance';


export const addNewBlog = createAsyncThunk(
  'blogs/addNewBlog',
  async (blogData) => {
    try {
      // const response = await axiosInstance.post('https://expert-couscous-r4gvggj5jg993wwrr-5220.app.github.dev/api/Blogs/AddBlog', blogData);
      // const response = await axiosInstance.post('https://localhost:7268/api/Blogs/AddBlog', blogData);
      const response = await axiosInstance.post('http://localhost:5220/api/Blogs/AddBlog', blogData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const deleteBlog = createAsyncThunk(
  'blogs/delete',
  async (blogid) => {
      try {
          // const response = await axiosInstance.delete('https://expert-couscous-r4gvggj5jg993wwrr-5220.app.github.dev/api/Blogs/DeleteBlog',
          // const response = await axiosInstance.delete('https://localhost:7268/api/Blogs/DeleteBlog',
          const response = await axiosInstance.delete('http://localhost:5220/api/Blogs/DeleteBlog',
              { data: { blogId: blogid} }
          );
          return response.data;
      } catch (error) {
          throw error;
      }
  }
);
export const getBlog = createAsyncThunk(
  'blogs/getBlog',
  async (blogid) => {
    try {
      // const response = await axiosInstance.post('https://expert-couscous-r4gvggj5jg993wwrr-5220.app.github.dev/api/Blogs/ReturnOneBlog', blogid);
      // const response = await axiosInstance.post('https://localhost:7268/api/Blogs/ReturnOneBlog', blogid);
      const response = await axiosInstance.post('http://localhost:5220/api/Blogs/ReturnOneBlog', blogid);
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
      // const response = await axiosInstance.post('https://expert-couscous-r4gvggj5jg993wwrr-5220.app.github.dev/api/Blogs/Like', blogid);
      // const response = await axiosInstance.post('https://localhost:7268/api/Blogs/Like', blogid);
      const response = await axiosInstance.post('http://localhost:5220/api/Blogs/Like', blogid);
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
      // const response = await axiosInstance.post('https://expert-couscous-r4gvggj5jg993wwrr-5220.app.github.dev/api/Blogs/DisLike', blogid);
      // const response = await axiosInstance.post('https://localhost:7268/api/Blogs/DisLike', blogid);
      const response = await axiosInstance.post('http://localhost:5220/api/Blogs/DisLike', blogid);
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
      // const response = await axiosInstance.post('https://humble-meme-979499pgp76q3pq76-5220.app.github.dev/api/Blogs/ReturnAllBlogs');
      // const response = await axiosInstance.post('https://localhost:7268/api/Blogs/ReturnAllBlogs');
      const response = await axiosInstance.post('http://localhost:5220/api/Blogs/ReturnAllBlogs');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  blogs: [],
  blog: {},
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
          id: blog.id,
          usrName: blog.usrName,
          publicationDate: blog.publicationDate,
          numberOfDisLikes: blog.numberOfDisLikes,
          numberOfLikes: blog.numberOfLikes,
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
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;

        state.blogs.push(action.payload);
      })
      .addCase(deleteBlog.rejected, (state, action) => {
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
      })
      .addCase(getBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload

      })
      .addCase(getBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const selectAllBlogs = (state) => state.blogs.blogs;
export const selectBlogsLoading = (state) => state.blogs.loading;
export const selectBlogsError = (state) => state.blogs.error;
export const selectOneBlog = (state) => state.blog;

export default blogSlice.reducer;
