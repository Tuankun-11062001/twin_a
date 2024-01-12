import React from "react";
import MainLayout from "../../../common/layout/mainLayout";
import Breadcrumb from "../../../common/components/breadcrumb";
import Box from "../../../common/components/box";
import { useNavigate } from "react-router-dom";

const HomeProduct = () => {
  const navigate = useNavigate();
  const dataProductTotal = {
    svg: "product",
    title: "Total product",
    total: 20,
  };

  const dataProductMoney = {
    svg: "$",
    title: "Money earn today",
    money: 300,
  };

  const dataViewListProductToday = {
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

  // data view list
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
    "category",
    "color",
    "Partner",
    "Prices",
    "profits",
    "Views",
    "isPublic",
    "Buy click",
    "data",
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
    console.log(item);
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

  return (
    <MainLayout>
      <Breadcrumb title="Products" type="breadcrumbProduct" />
      <div className="product product_head">
        <Box type="view" data={dataProductTotal} classname="box box_view" />
        <Box type="view" data={dataProductMoney} classname="box box_view" />
        <Box type="viewListToday" data={dataViewListProductToday} />
      </div>
      <Box type="viewList" data={dataListProduct} />
    </MainLayout>
  );
};

export default HomeProduct;
