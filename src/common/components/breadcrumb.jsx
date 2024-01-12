import React, { useState } from "react";
import Button from "./widget/button";
import Svgs from "../localData/svgs";
import { useNavigate } from "react-router-dom";
import Notification from "./notification";
import { actions, useProviderNotification } from "../providers";

const Breadcrumb = ({ type, title, params, codeID }) => {
  switch (type) {
    case "breadcrumbDashboard":
      return <BreadcrumbDashboard title={title} />;
    case "breadcrumbProduct":
      return <BreadcrumbProduct title={title} />;
    case "breadcrumbProductDetail":
      return <BreadcrumbProductDetail title={title} params={params} />;
    case "breadcrumbProductAddd":
      return <BreadcrumbProductAdd title={title} codeID={codeID} />;
    case "breadcrumbCategory":
      return <BreadcrumbCategory title={title} />;
    case "breadcrumbCategoryAdd":
      return <BreadcrumbCategoryAdd title={title} />;
    default:
      return;
  }
};

const BreadcrumbDashboard = ({ title }) => {
  return (
    <div className="breadcrumb breadcrumb_dashboard">
      <h2>{title}</h2>
    </div>
  );
};

const BreadcrumbProduct = ({ title }) => {
  const navigate = useNavigate();

  const onListenAdd = () => {
    navigate("/product/add");
  };
  const onListenCategory = () => {
    navigate("/product/category");
  };
  return (
    <div className="breadcrumb breadcrumb_product">
      <h2>{title}</h2>
      <div>
        <Button
          title="Category"
          classname="button button_category"
          onListen={onListenCategory}
        />
        <Button
          title="Add One"
          classname="button button_add_product"
          onListen={onListenAdd}
        />
      </div>
    </div>
  );
};

const BreadcrumbProductDetail = ({ title, params }) => {
  const [state, dispatch] = useProviderNotification();

  const navigate = useNavigate();
  const onListenGoBack = () => {
    navigate(-1);
  };

  const onListenDelete = () => {
    dispatch(actions.setNotificationDelete(true));
  };

  return (
    <div className="breadcrumb breadcrumb_product_detail">
      <div className="breadcrumb_product_detail_head">
        <Button
          svg={<Svgs type="arrow" />}
          classname="button button_breadcrum_detail_back"
          onListen={onListenGoBack}
        />
        <h2>{title + " " + params}</h2>
      </div>
      <div>
        <Button
          title="Delete"
          svg={<Svgs type="trash" />}
          classname="button button_product_delete"
          onListen={onListenDelete}
        />
      </div>
      {state.notification.deleteProduct && (
        <Notification type="deleteProduct" idCode={params} />
      )}
    </div>
  );
};

const BreadcrumbProductAdd = ({ title, codeID }) => {
  const navigate = useNavigate();
  const onListenGoBack = () => {
    navigate(-1);
  };
  return (
    <div className="breadcrumb breadcrumb_product_add">
      <div className="breadcrumb_product_add_head">
        <Button
          svg={<Svgs type="arrow" />}
          classname="button button_breadcrum_add_back"
          onListen={onListenGoBack}
        />
        <h2>{title}</h2>
      </div>
      <p>ID Code: {codeID}</p>
    </div>
  );
};

const BreadcrumbCategory = ({ title }) => {
  const navigate = useNavigate();
  const onListenGoBack = () => {
    navigate(-1);
  };

  const onListenAddCategory = () => {
    navigate("/product/category/add");
  };

  return (
    <div className="breadcrumb breadcrumb_product_add">
      <div className="breadcrumb_product_add_head">
        <Button
          svg={<Svgs type="arrow" />}
          classname="button button_breadcrum_add_back"
          onListen={onListenGoBack}
        />
        <h2>{title}</h2>
      </div>
      <Button
        title="Add Cateogry"
        onListen={onListenAddCategory}
        classname="button button_add_category"
      />
    </div>
  );
};

const BreadcrumbCategoryAdd = ({ title }) => {
  const navigate = useNavigate();
  const onListenGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="breadcrumb breadcrumb_product_add">
      <div className="breadcrumb_product_add_head">
        <Button
          svg={<Svgs type="arrow" />}
          classname="button button_breadcrum_add_back"
          onListen={onListenGoBack}
        />
        <h2>{title}</h2>
      </div>
    </div>
  );
};

export default Breadcrumb;
