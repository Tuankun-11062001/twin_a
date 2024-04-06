import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createCategoryAPI,
  deleteCategoryAPI,
  getAllCategoriesAPI,
} from "../../api/categoryAPI";

const initCategory = {
  categories: [],
  loading: false,
  error: "",
  message: "",
  notification: false,
  idCategory: "",
};

// thunk

export const getAllCategoriesThunk = createAsyncThunk(
  "store_category",
  async () => {
    try {
      const res = await getAllCategoriesAPI();
      return res;
    } catch (error) {
      console.log("error get category", error);
    }
  }
);

export const createCategoryThunk = createAsyncThunk(
  "store_category_create",
  async (payload) => {
    try {
      const res = await createCategoryAPI(payload);
      return res;
    } catch (error) {
      console.log("error create category", error);
    }
  }
);

export const deleteCategoryThunk = createAsyncThunk(
  "store_category_delete",
  async (payload) => {
    try {
      const res = await deleteCategoryAPI(payload);
      return res;
    } catch (error) {
      console.log("error create category", error);
    }
  }
);

const CategorySlice = createSlice({
  name: "store_category",
  initialState: initCategory,
  reducers: {
    notificationDelete: (state, actions) => {
      state.notification = true;
      state.message = `Are you sure to delete Category ${actions.payload.title}`;
      state.idCategory = actions.payload._id;
    },
    closeMessage: (state, actions) => {
      state.message = actions.payload;
      state.notification = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // get all categorires
      .addCase(getAllCategoriesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCategoriesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getAllCategoriesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // create category
      .addCase(createCategoryThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCategoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.notification = true;
        state.categories = action.payload.data;
      })
      .addCase(createCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // create category
      .addCase(deleteCategoryThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.notification = true;
        state.categories = action.payload.data;
      })
      .addCase(deleteCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { closeMessage, notificationDelete } = CategorySlice.actions;
export default CategorySlice.reducer;
