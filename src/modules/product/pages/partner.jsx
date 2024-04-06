import React, { useState } from "react";
import MainLayout from "../../../common/layout/mainLayout";
import Breadcrumb from "../../../common/components/breadcrumb";
import {
  BoxList,
  BoxView,
  BoxViewListCategoryAndPartner,
} from "../../../common/components/box";
import { NotificationAsk } from "../../../common/components/notification";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { enumProduct } from "../../../common/enum/product";
import { enumNotification } from "../../../common/enum/notification";
import { useSelector, useDispatch } from "react-redux";
import {
  closeMessage,
  deletePartnerThunk,
  getAllPartnerThunk,
  notificationDelete,
} from "../../../common/providers/slices/partnerSlice";
import { getProductsThunk } from "../../../common/providers/slices/productSlice";
const Partner = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { partners, notification, message, idPartner } = useSelector(
    (state) => state.partner
  );
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    (async () => {
      if (partners.length < 1) {
        dispatch(getAllPartnerThunk());
      }
      if (products.length < 1) {
        dispatch(getProductsThunk());
      }
    })();
  }, []);

  const dataTotalCategory = {
    title: "Total Partners",
    svg: "product",
    view: partners?.length,
  };
  const dataTotalProduct = {
    title: "Total product",
    svg: "product",
    view: "50",
  };

  const navigateDetail = (item) => {
    navigate(`/product/${item._id}`, { state: item._id });
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
  //                      List partner
  // =================================================================

  const handleDelete = async (dataCategory) => {
    dispatch(notificationDelete(dataCategory));
  };

  const handleDeleteAccept = async () => {
    dispatch(deletePartnerThunk(idPartner));
  };

  const handleView = () => {};

  const data = {
    list: partners,
    title: "Partners",
    handleDelete,
    handleView,
  };

  const partnerBreadcrumbs = {
    title: "Partner",
    buttonBack: {
      onListen: () => navigate(-1),
    },
    buttons: [
      {
        title: "Add Partner",
        classname: "button button_category",
        onListen: () => navigate("/product/partner/add"),
      },
    ],
  };

  return (
    <MainLayout>
      <Breadcrumb data={partnerBreadcrumbs} />
      <div className="category">
        <div className="category_head">
          <BoxViewListCategoryAndPartner data={data} />
          <BoxView data={dataTotalCategory} classname="box box_view_small" />
          <BoxView data={dataTotalProduct} classname="box box_view_small" />
        </div>
        <BoxList data={dataProduct} />
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

export default Partner;
