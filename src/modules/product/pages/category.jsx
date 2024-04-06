import React, { useState } from "react";
import MainLayout from "../../../common/layout/mainLayout";
import Breadcrumb from "../../../common/components/breadcrumb";
import {
  BoxList,
  BoxView,
  BoxViewListCategoryAndPartner,
} from "../../../common/components/box";

import Notification, {
  NotificationAsk,
} from "../../../common/components/notification";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { enumProduct } from "../../../common/enum/product";
import { enumCategory } from "../../../common/enum/category";
import { useSelector, useDispatch } from "react-redux";
import {
  closeMessage,
  deleteCategoryThunk,
  getAllCategoriesThunk,
  notificationDelete,
} from "../../../common/providers/slices/categorySlice";
import { getProductsThunk } from "../../../common/providers/slices/productSlice";

const Category = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { partners } = useSelector((state) => state.partner);
  const { categories, notification, message, idCategory } = useSelector(
    (state) => state.category
  );
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    (async () => {
      if (categories.length < 1) {
        dispatch(getAllCategoriesThunk());
      }
      if (products.length < 1) {
        dispatch(getProductsThunk());
      }
    })();
  }, []);

  const dataTotalCategory = {
    title: enumCategory.titleTotal,
    svg: enumCategory.svg,
    view: categories?.length,
  };
  const dataTotalProduct = {
    title: enumProduct.titleTotal,
    svg: enumProduct.svg,
    view: products.length,
  };

  const navigateDetail = (item) => {
    navigate(`/product/${item.code}`, { state: item._id });
  };

  const dataProduct = {
    svg: enumProduct.full.svg,
    title: enumProduct.full.title,
    total: 20,
    selects: enumProduct.full.selects,
    type: enumProduct.full.type,
    dataTable: {
      type: enumProduct.full.table.type,
      titles: enumProduct.full.table.titles,
      dataView: products,
      navigateDetail,
    },
  };

  // =================================================================
  //                      List categories
  // =================================================================

  const handleDelete = async (dataCategory) => {
    dispatch(notificationDelete(dataCategory));
  };

  const handleDeleteAccept = async () => {
    dispatch(deleteCategoryThunk(idCategory));
  };

  const handleView = () => {};

  const data = {
    type: enumCategory.viewAll.type,
    title: enumCategory.viewAll.title,
    list: categories,
    handleDelete,
    handleView,
  };

  const categoryBreadcrumb = {
    buttonBack: {
      onListen: () => navigate(-1),
    },
    title: "Product Category",
    buttons: [
      {
        title: "Add Category",
        classname: "button button_category",
        onListen: () => navigate("/product/category/add"),
      },
    ],
  };

  return (
    <MainLayout>
      <Breadcrumb data={categoryBreadcrumb} />
      <div className="category">
        <div className="category_head">
          <BoxViewListCategoryAndPartner data={data} />
          <BoxView data={dataTotalCategory} classname="box box_view_small" />
          <BoxView data={dataTotalProduct} classname="box box_view_small" />
        </div>
        <BoxList type="viewList" data={dataProduct} />
      </div>
      {notification && (
        <NotificationAsk
          info={message}
          handleClose={() => dispatch(closeMessage(""))}
          handleAccept={() => handleDeleteAccept()}
        />
      )}
    </MainLayout>
  );
};

export default Category;
