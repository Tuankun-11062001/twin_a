import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createBlogAPI,
  deleteBlogAPI,
  editBlogAPI,
  getAllBlogAPI,
  getBlogAPI,
} from "../../api/blogAPI";

const initBlog = {
  blogs: [],
  loading: false,
  error: "",
  message: "",
  notification: false,
  notificationEdit: false,
  blogId: "",
};

// thunk

export const getAllBlogThunk = createAsyncThunk("blog_get", async () => {
  try {
    const res = await getAllBlogAPI();
    return res;
  } catch (error) {
    console.log("error get blogs", error);
  }
});

export const createBlogThunk = createAsyncThunk(
  "blog_create",
  async (payload) => {
    try {
      const res = await createBlogAPI(payload);
      return res;
    } catch (error) {
      console.log("cant create blog");
    }
  }
);

export const deleteBlogThunk = createAsyncThunk(
  "blog_delete",
  async (payload) => {
    try {
      const res = await deleteBlogAPI(payload);
      return res;
    } catch (error) {
      console.log("cant create blog");
    }
  }
);

export const editBlogThunk = createAsyncThunk("blog_edit", async (payload) => {
  try {
    const res = await editBlogAPI(payload);
    return res;
  } catch (error) {
    console.log("cant edit blog");
  }
});

const BlogSlice = createSlice({
  name: "store_blogs",
  initialState: initBlog,
  reducers: {
    askDelBlog: (state, actions) => {
      state.notification = true;
      state.message = `Are you sure to delete blog id ${actions.payload}`;
      state.blogId = actions.payload;
    },
    closeMessage: (state, actions) => {
      state.message = actions.payload;
      state.notification = false;
      state.notificationEdit = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // get all blog
      .addCase(getAllBlogThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBlogThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(getAllBlogThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // create blog blog
      .addCase(createBlogThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBlogThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.notification = true;
      })
      .addCase(createBlogThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // edit blog blog
      .addCase(editBlogThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(editBlogThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.notificationEdit = true;
      })
      .addCase(editBlogThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // delete blog blog
      .addCase(deleteBlogThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBlogThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.notification = true;
        state.blogs = action.payload.data;
      })
      .addCase(deleteBlogThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { closeMessage, askDelBlog } = BlogSlice.actions;
export default BlogSlice.reducer;
