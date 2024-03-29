import React, { useState } from "react";
import MainLayout from "../../../common/layout/mainLayout";
import Breadcrumb from "../../../common/components/breadcrumb";
import {
  BoxList,
  BoxView,
  BoxViewListCategoryAndPartner,
} from "../../../common/components/box";
import {
  actions,
  useProviderCategory,
  useProviderNotification,
  useProviderProduct,
} from "../../../common/providers";
import {
  deleteCategory,
  getAllCategories,
} from "../../../common/api/categoryAPI";
import Notification from "../../../common/components/notification";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { enumProduct } from "../../../common/enum/product";
import { getAllProduct } from "../../../common/api/productAPI";
import { enumCategory } from "../../../common/enum/category";

const Category = () => {
  const navigate = useNavigate();
  const [stateCategory, dispatchCategory] = useProviderCategory();
  const [stateNotification, dispatchNotification] = useProviderNotification();
  const [stateProduct, dispatchProduct] = useProviderProduct();
  const [stateDataDelete, setStateDataDelete] = useState({});

  useEffect(() => {
    (async () => {
      if (stateCategory.categories.length < 1) {
        const listCategory = await getAllCategories();
        dispatchCategory(actions.getCategories(listCategory));
      }
      if (stateProduct.products.length < 1) {
        const listProduct = await getAllProduct();
        dispatchProduct(actions.getProducts(listProduct));
      }
    })();
  }, []);

  const dataTotalCategory = {
    title: enumCategory.titleTotal,
    svg: enumCategory.svg,
    view: stateCategory.categories?.length,
  };
  const dataTotalProduct = {
    title: enumProduct.titleTotal,
    svg: enumProduct.svg,
    view: stateProduct.products.length,
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
      dataView: stateProduct.products,
      navigateDetail,
    },
  };

  // =================================================================
  //                      List categories
  // =================================================================

  const handleDelete = async (dataCategory) => {
    setStateDataDelete(dataCategory);
    dispatchNotification(actions.setNotificationDelete(true));
  };

  const handleYesDelete = async () => {
    const newListCategory = await deleteCategory(stateDataDelete._id);
    dispatchCategory(actions.deleteCategory(newListCategory));
    dispatchNotification(actions.setNotificationDelete(false));
  };

  const handleView = () => {};

  const data = {
    type: enumCategory.viewAll.type,
    title: enumCategory.viewAll.title,
    list: stateCategory.categories,
    handleDelete,
    handleView,
  };

  const dataNotification = {
    title: "Notification",
    code: stateDataDelete._id,
    body: "Are you sure you want to delete this category",
    handleYesDelete,
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
      {stateNotification.notification.delete && (
        <Notification type="delete" data={dataNotification} />
      )}
    </MainLayout>
  );
};

export default Category;
