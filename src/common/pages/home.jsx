import React, { useEffect, useState } from "react";
import MainLayout from "../layout/mainLayout";
import { useNavigate } from "react-router-dom";
import Loading from "../pages/loading";
import Breadcrumb from "../components/breadcrumb";
import { BoxList, BoxView, BoxViewList } from "../components/box";
import { enumVisitor } from "../enum/visitor";
import { enumBlog } from "../enum/blog";
import { enumProduct } from "../enum/product";
import { enumMoney } from "../enum/money";
import { useSelector, useDispatch } from "react-redux";
import { getProductsThunk } from "../providers/slices/productSlice";
import { getAllBlogThunk } from "../providers/slices/blogSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loadingToken, setLoadingToken] = useState(true);
  const { products, loading } = useSelector((state) => state.product);
  const { blogs } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getProductsThunk());
    dispatch(getAllBlogThunk());
  }, []);

  // =================================================================
  //                    Check admin token
  // =================================================================

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    setLoadingToken(false);
  }, []);

  // =================================================================
  //                    Check View list & view APP
  // =================================================================

  const dataViewVisistor = {
    title: enumVisitor.viewApp.title,
    view: enumVisitor.viewApp.view,
    svg: enumVisitor.viewApp.svg,
  };

  const dataViewListBlog = {
    title: enumBlog.viewList.title,
    view: enumBlog.viewList.view,
    svg: enumBlog.viewList.svg,
    selects: enumBlog.viewList.selects,
    dataTable: {
      type: enumBlog.viewList.table.type,
      dataTableTitle: enumBlog.viewList.table.titles,
      dataList: blogs,
    },
  };

  const dataViewListProduct = {
    title: enumProduct.viewList.title,
    view: enumProduct.viewList.view,
    svg: enumProduct.viewList.svg,
    dataTable: {
      type: enumProduct.viewList.table.type,
      dataTableTitle: enumProduct.viewList.table.titles,
      dataList: products,
    },
    selects: enumProduct.viewList.selects,
  };

  // =================================================================
  //                    Check View list product
  // =================================================================

  const navigateDetail = (item) => {
    navigate(`/product/${item.code}`, { state: item._id });
  };

  const dataListProduct = {
    svg: enumProduct.listShort.svg,
    title: enumProduct.listShort.title,
    total: 20,
    selects: enumProduct.listShort.selects,
    type: enumProduct.listShort.type,
    dataTable: {
      type: enumProduct.listShort.table.type,
      titles: enumProduct.listShort.table.titles,
      dataView: products,
      navigateDetail,
    },
  };

  // dât view money product

  const dataViewMoneyProduct = {
    svg: enumMoney.product.svg,
    title: enumMoney.product.title,
    money: 200,
  };

  // =================================================================
  //                    Check View list blog
  // =================================================================

  const navigateDetailBlog = (item) => {
    navigate(`/blog/${item.title}`, { state: item._id });
  };

  const dataListBlog = {
    svg: enumBlog.listShort.svg,
    title: enumBlog.listShort.title,
    total: blogs?.length,
    selects: enumBlog.listShort.selects,
    dataTable: {
      type: enumBlog.listShort.table.type,
      titles: enumBlog.listShort.table.titles,
      dataView: blogs,
      navigateDetail: navigateDetailBlog,
    },
  };

  // data blog money
  const dataViewMoneyBlog = {
    svg: enumMoney.blog.svg,
    title: enumMoney.blog.title,
    money: 200,
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <MainLayout>
          <Breadcrumb data={{ title: "DashBoard" }} />
          {/* <div className="dashboard dashboard_view">
            <BoxView data={dataViewVisistor} classname="box box_view_small" />
            <BoxViewList data={dataViewListBlog || []} />
            <BoxViewList data={dataViewListProduct || []} />
          </div> */}
          <div className="dashboard dashboard_product">
            <BoxList data={dataListProduct || []} />
            {/* <BoxView data={dataViewMoneyProduct} classname="box box_view" /> */}
          </div>
          <div className="dashboard dashboard_blog">
            <BoxList data={dataListBlog || []} />
            {/* <BoxView data={dataViewMoneyBlog || []} classname="box box_view" /> */}
          </div>
        </MainLayout>
      )}
    </>
  );
};

export default Home;
