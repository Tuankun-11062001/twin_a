import React, { useState } from "react";
import MainLayout from "../../../common/layout/mainLayout";
import Breadcrumb from "../../../common/components/breadcrumb";
import {
  BoxAddCategoryAndPartner,
  BoxView,
} from "../../../common/components/box";
import {
  actions,
  useProviderNotification,
  useProviderPartner,
} from "../../../common/providers";
import Notification from "../../../common/components/notification";
import { useNavigate } from "react-router-dom";
import { createPartner } from "../../../common/api/partnerAPI";

const AddPartner = () => {
  const navigate = useNavigate();
  const [statePartner, dispatchPartner] = useProviderPartner();
  const [stateNotification, dispatchNotification] = useProviderNotification();

  const [dataPartner, setDataPartner] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataPartner({ ...dataPartner, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const newPartner = await createPartner(dataPartner);
      dispatchPartner(actions.createPartner(newPartner));
      dispatchNotification(actions.setNotificationAdd(true));
    } catch (error) {
      console.log("can't create category", error);
    }
  };

  const dataNotification = {
    title: "Notification",
    body: "Create category successfully",
  };

  const data = {
    formGroupCategoryTitle: {
      type: "normal",
      classnameFormGroup: "form_group",
      lable: "Title",
      inputClassname: "input input_form_group",
      inputListen: handleChange,
      inputName: "title",
      inputValue: dataPartner.title,
    },

    formGroupCategoryDescription: {
      type: "area",
      classnameFormGroup: "form_group",
      lable: "Description",
      classnameArea: "area",
      inputClassname: "input input_form_group",
      inputListen: handleChange,
      inputName: "description",
      inputValue: dataPartner.description,
    },

    handleCreate: handleSubmit,
  };

  const dataViewTotalCategory = {
    title: "Total Category",
    svg: "view",
    view: statePartner.partners?.length,
  };

  const dataTotalProduct = {
    title: "Total Product",
    svg: "view",
  };

  const addPartnerBreadcrumb = {
    title: "Create Partner",
    buttonBack: {
      onListen: () => navigate(-1),
    },
  };

  return (
    <MainLayout>
      <Breadcrumb data={addPartnerBreadcrumb} />
      <div className="category category_add">
        <BoxAddCategoryAndPartner data={data} />
        <BoxView data={dataViewTotalCategory} classname="box box_view_small" />
        <BoxView data={dataTotalProduct} classname="box box_view_small" />
      </div>
      {stateNotification.notification.add && (
        <Notification type="add" data={dataNotification} />
      )}
    </MainLayout>
  );
};

export default AddPartner;
