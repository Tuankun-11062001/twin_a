import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import blogSlice from "./slices/blogSlice";
import partnerSlice from "./slices/partnerSlice";
import categorySlice from "./slices/categorySlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
    reducer:{
        product:productSlice,
        blog:blogSlice,
        partner:partnerSlice,
        category:categorySlice,        
        user:userSlice
    }
})

export default store