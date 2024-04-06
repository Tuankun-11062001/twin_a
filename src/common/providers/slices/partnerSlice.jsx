import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createPartnerAPI,
  deletePartnerAPI,
  getAllPartnersAPI,
} from "../../api/partnerAPI";

const initPartner = {
  partners: [],
  loading: false,
  error: "",
  notification: false,
  message: "",
  idPartner: "",
};

// thunk

export const getAllPartnerThunk = createAsyncThunk(
  "store_partner",
  async () => {
    try {
      const res = await getAllPartnersAPI();
      return res;
    } catch (error) {
      console.log("error get partner", error);
    }
  }
);

export const addPartnerThunk = createAsyncThunk(
  "store_partner_add",
  async (payload) => {
    try {
      const res = await createPartnerAPI(payload);
      return res;
    } catch (error) {
      console.log("error create partner", error);
    }
  }
);

export const deletePartnerThunk = createAsyncThunk(
  "store_partner_delete",
  async (id) => {
    try {
      const res = await deletePartnerAPI(id);
      return res;
    } catch (error) {
      console.log("error create partner", error);
    }
  }
);

const PartnerSlice = createSlice({
  name: "store_partner",
  initialState: initPartner,
  reducers: {
    notificationDelete: (state, actions) => {
      state.message = `Are you sure to delete Partner ${actions.payload.title}`;
      state.notification = true;
      state.idPartner = actions.payload._id;
    },
    closeMessage: (state, actions) => {
      state.message = actions.payload;
      state.notification = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // get all partner
      .addCase(getAllPartnerThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPartnerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.partners = action.payload;
      })
      .addCase(getAllPartnerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // create a partner
      .addCase(addPartnerThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPartnerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.notification = true;
        state.partners = action.payload.data;
      })
      .addCase(addPartnerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // delete a partner
      .addCase(deletePartnerThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePartnerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.notification = true;
        state.partners = action.payload.data;
      })
      .addCase(deletePartnerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { closeMessage, notificationDelete } = PartnerSlice.actions;
export default PartnerSlice.reducer;
