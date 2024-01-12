import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeProduct from "../pages/home";
import DetailProduct from "../pages/detailProduct";
import NotFound404 from "../../../common/pages/notFound404";
import AddProduct from "../pages/addProduct";
import Category from "../pages/category";
import AddCategory from "../pages/addCategory";
const ProductRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeProduct />} />
      <Route path="/add" element={<AddProduct />} />
      <Route path="/category" element={<Category />} />
      <Route path="/category/add" element={<AddCategory />} />
      <Route path="/:id" element={<DetailProduct />} />
      <Route path="*" element={<NotFound404 />} />
    </Routes>
  );
};

export default ProductRouter;
