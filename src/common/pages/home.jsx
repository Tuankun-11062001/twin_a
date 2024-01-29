import React, { useEffect, useState } from "react";
import MainLayout from "../layout/mainLayout";
import { useNavigate } from "react-router-dom";
import Loading from "../pages/loading";
import Breadcrumb from "../components/breadcrumb";
import { BoxList, BoxView, BoxViewList } from "../components/box";
import {
  actions,
  useProviderBlog,
  useProviderCategory,
  useProviderPartner,
  useProviderProduct,
} from "../providers";
import { getAllCategories } from "../api/categoryAPI";
import { getAllPartners } from "../api/partnerAPI";
import { getAllProduct } from "../api/productAPI";
import { enumVisitor } from "../enum/visitor";
import { enumBlog } from "../enum/blog";
import { enumProduct } from "../enum/product";
import { enumMoney } from "../enum/money";
import { getAllBlog } from "../api/blogAPI";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // =================================================================
  //                    Loading data
  // =================================================================
  const [stateCategory, dispatchCategory] = useProviderCategory();
  const [statePartner, dispatchPartner] = useProviderPartner();
  const [stateProduct, dispatchProduct] = useProviderProduct();
  const [stateBlog, dispatchBlog] = useProviderBlog();

  useEffect(() => {
    (async () => {
      if (stateCategory.categories.length < 1) {
        const listCategory = await getAllCategories();
        dispatchCategory(actions.getCategories(listCategory));
      }
      if (statePartner.partners.length < 1) {
        const listPartner = await getAllPartners();
        dispatchPartner(actions.getPartners(listPartner));
      }
      if (stateProduct.products.length < 1) {
        const listProduct = await getAllProduct();
        dispatchProduct(actions.getProducts(listProduct));
      }
      if (stateBlog.blogs.length < 1) {
        const listProduct = await getAllBlog();
        dispatchBlog(actions.getBlogs(listProduct));
      }
    })();
  }, []);

  // =================================================================
  //                    Check admin token
  // =================================================================

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    setLoading(false);
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
      dataList: [
        {
          title: "How to make navigation 3d UI",
          view: "300",
        },
        {
          title: "How to make navigation 3d UI",
          view: "300",
        },
      ],
    },
  };

  const dataViewListProduct = {
    title: enumProduct.viewList.title,
    view: enumProduct.viewList.view,
    svg: enumProduct.viewList.svg,
    dataTable: {
      type: enumProduct.viewList.table.type,
      dataTableTitle: enumProduct.viewList.table.titles,
      dataList: stateProduct.products,
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
      dataView: stateProduct.products,
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
    total: stateBlog.blogs.length,
    selects: enumBlog.listShort.selects,
    dataTable: {
      type: enumBlog.listShort.table.type,
      titles: enumBlog.listShort.table.titles,
      dataView: stateBlog.blogs,
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
          <div className="dashboard dashboard_view">
            <BoxView data={dataViewVisistor} classname="box box_view_small" />
            <BoxViewList data={dataViewListBlog} />
            <BoxViewList data={dataViewListProduct} />
          </div>
          <div className="dashboard dashboard_product">
            <BoxList data={dataListProduct} />
            <BoxView data={dataViewMoneyProduct} classname="box box_view" />
          </div>
          <div className="dashboard dashboard_blog">
            <BoxList data={dataListBlog} />
            <BoxView data={dataViewMoneyBlog} classname="box box_view" />
          </div>
        </MainLayout>
      )}
    </>
  );
};

export default Home;
