import React, { useLayoutEffect, useState } from "react";
import MainLayout from "../../../common/layout/mainLayout";
import Breadcrumb from "../../../common/components/breadcrumb";
import {
  BoxList,
  BoxView,
  BoxViewListCategoryAndPartner,
} from "../../../common/components/box";
import {
  actions,
  useProviderNotification,
  useProviderPartner,
  useProviderProduct,
} from "../../../common/providers";
import Notification from "../../../common/components/notification";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllPartners,
  deletePartner as deletePartnerAPI,
} from "../../../common/api/partnerAPI";
import { deletePartner } from "../../../common/providers/actions";
import { enumProduct } from "../../../common/enum/product";
import { getAllProduct } from "../../../common/api/productAPI";
import { enumNotification } from "../../../common/enum/notification";

const Partner = () => {
  const navigate = useNavigate();
  const [stateNotification, dispatchNotification] = useProviderNotification();
  const [statePartner, dispatchPartner] = useProviderPartner();
  const [stateProduct, dispatchProduct] = useProviderProduct();
  const [stateDataDelete, setStateDataDelete] = useState({});

  useEffect(() => {
    (async () => {
      if (statePartner.partners.length < 1) {
        const listPartners = await getAllPartners();
        dispatchPartner(actions.getPartners(listPartners));
      }
      if (stateProduct.products.length < 1) {
        const listProduct = await getAllProduct();
        dispatchProduct(actions.getProducts(listProduct));
      }
    })();
  }, []);

  const dataTotalCategory = {
    title: "Total Partners",
    svg: "product",
    view: statePartner.partners?.length,
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
      dataView: stateProduct.products,
      navigateDetail,
    },
  };

  // =================================================================
  //                      List partner
  // =================================================================

  const handleDelete = async (dataCategory) => {
    setStateDataDelete(dataCategory);
    dispatchNotification(actions.setNotificationDelete(true));
  };

  const handleYesDelete = async () => {
    const newListPartner = await deletePartnerAPI(stateDataDelete._id);
    dispatchPartner(actions.deletePartner(newListPartner));
    dispatchNotification(actions.setNotificationDelete(false));
  };

  const handleView = () => {};

  const data = {
    list: statePartner.partners,
    title: "Partners",
    handleDelete,
    handleView,
  };

  const dataNotification = {
    title: enumNotification.partner.title,
    code: stateDataDelete._id,
    body: enumNotification.partner.body,
    handleYesDelete,
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
      {stateNotification.notification.delete && (
        <Notification type="delete" data={dataNotification} />
      )}
    </MainLayout>
  );
};

export default Partner;
