import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import Home from "../pages/home";
import BlogRouter from "../../modules/blog/router/blogRouter";
import ProductRouter from "../../modules/product/router/productRouter";
import NotFound404 from "../pages/notFound404";
import Signup from "../pages/signup";
import Login from "../pages/login";
import ForgetPass from "../pages/forgotPass";
const MainRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotPassword" element={<ForgetPass />} />
        <Route path="/blog/*" element={<BlogRouter />} />
        <Route path="/product/*" element={<ProductRouter />} />
        {/* <Route path="*" element={<NotFound404 />} /> */}
      </Routes>
    </HashRouter>
  );
};

export default MainRouter;
