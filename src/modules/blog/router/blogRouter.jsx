import React from "react";
import { Routes, Route } from "react-router-dom";
import AddBlog from "../pages/addBlog";
import DetailBlog from "../pages/detailBlog";
import HomeBlog from "../pages/home";

const BlogRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeBlog />} />
      <Route path="/add" element={<AddBlog />} />
      <Route path="/:id" element={<DetailBlog />} />
    </Routes>
  );
};

export default BlogRouter;
