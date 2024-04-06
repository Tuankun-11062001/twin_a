import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createProductAPI,
  deleteProductAPI,
  getAllProductAPI,
  getProductByIdAPI,
  updateProductAPI,
} from "../../api/productAPI";

const initProduct = {
  products: [],
  product: {},
  loading: false,
  error: "",
  message: "",
  notification: false,
  notificationEdit: false,
  productId: "",
};

// thunk
export const getProductsThunk = createAsyncThunk(
  "store_product/getProducts",
  async () => {
    try {
      const res = await getAllProductAPI();
      return res;
    } catch (error) {
      console.log("error get products", error);
    }
  }
);

export const getProductByID = createAsyncThunk(
  "store_product/get_product_by_id",
  async (id) => {
    try {
      const res = await getProductByIdAPI(id);
      return res;
    } catch (error) {
      console.log("error get products", error);
    }
  }
);

export const createProductThunk = createAsyncThunk(
  "store_product/create_product",
  async (dataProduct) => {
    try {
      const res = await createProductAPI(dataProduct);
      console.log("res_create", res);
      return res;
    } catch (error) {
      console.log("error create products", error);
    }
  }
);

export const editProductThunk = createAsyncThunk(
  "store_product/edit_product",
  async (dataProduct) => {
    try {
      const res = await updateProductAPI(dataProduct);
      console.log("res_edit", res);
      return res;
    } catch (error) {
      console.log("error create products", error);
    }
  }
);

export const deleteProductThunk = createAsyncThunk(
  "store_product/del_product",
  async (dataProduct) => {
    try {
      const res = await deleteProductAPI(dataProduct);
      return res;
    } catch (error) {
      console.log("error create products", error);
    }
  }
);

const ProductSlice = createSlice({
  name: "store_product",
  initialState: initProduct,
  reducers: {
    askDelProduct: (state, actions) => {
      state.notification = true;
      state.message = `Are you sure to delete Product ${actions.payload.title}`;
      state.productId = actions.payload._id;
    },
    closeMessage: (state, actions) => {
      state.message = actions.payload;
      state.notification = false;
      state.notificationEdit = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // get all Product
      .addCase(getProductsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // create Product

      .addCase(createProductThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.notification = true;
        state.products = action.payload.data;
      })
      .addCase(createProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // get ID Product

      .addCase(getProductByID.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductByID.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProductByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // edit ID Product

      .addCase(editProductThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(editProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.notificationEdit = true;
        state.product = action.payload.data;
      })
      .addCase(editProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // delete ID Product

      .addCase(deleteProductThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.notification = true;
        state.products = action.payload.data;
      })
      .addCase(deleteProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { closeMessage, askDelProduct } = ProductSlice.actions;
export default ProductSlice.reducer;
