import React from "react";
import MainLayout from "../../../common/layout/mainLayout";
import Breadcrumb from "../../../common/components/breadcrumb";
import Box from "../../../common/components/box";

const Category = () => {
  const dataTotalCategory = {
    title: "Total Category",
    svg: "product",
    view: "3",
  };
  const dataTotalProduct = {
    title: "Total product",
    svg: "product",
    view: "50",
  };

  const titleTableProduct = [
    "stt",
    "code",
    "title",
    "category",
    "partner",
    "colors",
    "price",
    "views",
    "profit",
    "isPublic",
    "buy click",
    "date",
  ];

  const dataSelectProduct = [{ title: "all", value: "all" }];
  const dataProduct = {
    svg: "product",
    title: "product of pe category",
    total: "30",
    titleTable: titleTableProduct,
    dataViewSelect: dataSelectProduct,
  };
  return (
    <MainLayout>
      <Breadcrumb type="breadcrumbCategory" title="Product Category" />
      <div className="category">
        <div className="category_head">
          <Box type="category" />
          <Box
            type="view"
            data={dataTotalCategory}
            classname="box box_view_small"
          />
          <Box
            type="view"
            data={dataTotalProduct}
            classname="box box_view_small"
          />
        </div>
        <Box type="viewList" data={dataProduct} />
      </div>
    </MainLayout>
  );
};

export default Category;
