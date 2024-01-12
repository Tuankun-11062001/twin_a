import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeBlog from "../pages/home";

const BlogRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeBlog />} />
    </Routes>
  );
};

export default BlogRouter;
