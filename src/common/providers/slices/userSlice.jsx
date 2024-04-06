import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signup } from "../../api/userAPI";

const initUser = {
  user: [],
  loading: false,
  error: {},
  message: "",
};

// thunk
export const signUpThunk = createAsyncThunk("signup", async (payload) => {
  try {
    const res = await signup(payload);
    console.log("res_signup", res);
    return res;
  } catch (error) {
    console.log("error signup", error);
  }
});

const UserSlice = createSlice({
  name: "store_User",
  initialState: initUser,
  reducers: {
    resetMessage: (state, action) => {
      state.message = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUpThunk.fulfilled, (state, action) => {
        console.log("case signup", action.payload);
        state.loading = false;
        state.message = action.payload.message;
        state.user = action.payload.data;
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
        state.notification = action.payload.message;
      });
  },
});

export const { resetMessage } = UserSlice.actions;
export default UserSlice.reducer;
