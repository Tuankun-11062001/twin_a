import React, { useEffect, useState } from "react";
import MainLayout from "../layout/mainLayout";
import { useNavigate } from "react-router-dom";
import Loading from "../pages/loading";
import Breadcrumb from "../components/breadcrumb";
import Box from "../components/box";
import { actions, useProviderCategory } from "../providers";
import axios from "axios";
import { getAllCategories } from "../api/categoryAPI";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // =================================================================
  //                    Loading data
  // =================================================================
  const [stateCategory, dispatchCategory] = useProviderCategory();
  useEffect(() => {
    const allCategory = async () => {
      const categories = await getAllCategories();
      dispatchCategory(actions.getCategories(categories));
    };
    allCategory();
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

  const dataViewVisistor = {
    title: "Total views today",
    view: "30k",
    svg: "view",
  };

  const dataViewListBlog = {
    title: "Total Views Blog Today",
    view: "30k",
    svg: "view",
    dataSelect: [
      {
        title: "all",
        value: "all",
      },
      {
        title: "high",
        value: "high",
      },
    ],
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
  };

  const dataViewListProduct = {
    title: "Total Views Product Today",
    view: "30k",
    svg: "view",
    dataSelect: [
      {
        title: "all",
        value: "all",
      },
      {
        title: "high",
        value: "high",
      },
    ],
    dataList: [
      {
        title: "How to make navigation 3d UI",
        code: "Pe01",
        view: "300",
      },
      {
        title: "How to make navigation 3d UI",
        code: "Pe01",
        view: "300",
      },
    ],
  };

  // view list
  const dataViewSelect = [
    {
      title: "view high",
      value: "high",
    },
    {
      title: "view newlates",
      value: "newlatest",
    },
  ];

  const titleTableProduct = [
    "Stt",
    "Code",
    "Title",
    "Partner",
    "Prices",
    "Views",
    "Buy click",
  ];

  const dataViewProduct = [
    {
      code: "123",
      title: "How to make UI navigation",
      partner: "Printify",
      price: "1000",
      views: "1000",
      buy: "1000",
    },
    {
      code: "123",
      title: "How to make UI navigation",
      partner: "Printify",
      price: "1000",
      views: "1000",
      buy: "1000",
    },
  ];

  const navigateDetailProduct = (item) => {
    navigate(`/product/${item.code}`, { state: item.code });
  };

  const dataListProduct = {
    svg: "product",
    title: "List products",
    total: 20,
    dataViewSelect,
    dataView: dataViewProduct,
    titleTable: titleTableProduct,
    navigateDetailProduct,
  };

  // dât view money product

  const dataViewMoneyProduct = {
    svg: "$",
    title: "Money earn product",
    money: 200,
  };

  // data list blog

  const titleTableBlog = ["Stt", "Title", "Views", "click source"];

  const dataViewBlog = [
    {
      title: "How to make UI navigation",
      view: "123",
      source: "Printify",
    },
    {
      title: "How to make UI navigation",
      view: "123",
      source: "Printify",
    },
  ];

  const dataListBlog = {
    svg: "blog",
    title: "List Blog",
    total: 20,
    dataViewSelect,
    dataView: dataViewBlog,
    titleTable: titleTableBlog,
  };

  // data blog money
  const dataViewMoneyBlog = {
    svg: "$",
    title: "Money earn product",
    money: 200,
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <MainLayout>
          <Breadcrumb type="breadcrumbDashboard" title="Dashboard" />
          <div className="dashboard dashboard_view">
            <Box type="view" data={dataViewVisistor} classname="box box_view" />
            <Box type="viewListToday" data={dataViewListBlog} />
            <Box type="viewListToday" data={dataViewListProduct} />
          </div>
          <div className="dashboard dashboard_product">
            <Box type="viewList" data={dataListProduct} />
            <Box
              type="view"
              data={dataViewMoneyProduct}
              classname="box box_view"
            />
          </div>
          <div className="dashboard dashboard_blog">
            <Box type="viewList" data={dataListBlog} />
            <Box
              type="view"
              data={dataViewMoneyBlog}
              classname="box box_view"
            />
          </div>
        </MainLayout>
      )}
    </>
  );
};

export default Home;
