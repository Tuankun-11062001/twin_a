import React, { useState } from "react";
import MainLayout from "../../../common/layout/mainLayout";
import Breadcrumb from "../../../common/components/breadcrumb";
import {
  BoxAddCategoryAndPartner,
  BoxView,
} from "../../../common/components/box";
import { createCategory } from "../../../common/api/categoryAPI";
import {
  actions,
  useProviderCategory,
  useProviderNotification,
} from "../../../common/providers";
import Notification from "../../../common/components/notification";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const navigate = useNavigate();
  const [stateCategory, dispatchCategory] = useProviderCategory();
  const [stateNotification, dispatchNotification] = useProviderNotification();

  const [dataCategory, setDataCategory] = useState({
    categoryCode: "",
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataCategory({ ...dataCategory, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const newCategory = await createCategory(dataCategory);
      dispatchCategory(actions.createCategory(newCategory));
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
    type: "category",

    formGroupCategoryCode: {
      type: "normal",
      classnameFormGroup: "form_group",
      lable: "Code Category",
      inputClassname: "input input_form_group",
      inputListen: handleChange,
      inputName: "categoryCode",
      inputValue: dataCategory.categoryCode,
    },

    formGroupCategoryTitle: {
      type: "normal",
      classnameFormGroup: "form_group",
      lable: "Title",
      inputClassname: "input input_form_group",
      inputListen: handleChange,
      inputName: "title",
      inputValue: dataCategory.title,
    },

    formGroupCategoryDescription: {
      type: "area",
      classnameFormGroup: "form_group",
      lable: "Description",
      classnameArea: "area",
      inputClassname: "input input_form_group",
      inputListen: handleChange,
      inputName: "description",
      inputValue: dataCategory.description,
    },

    handleCreate: handleSubmit,
  };

  const dataViewTotalCategory = {
    title: "Total Category",
    svg: "view",
    view: stateCategory.categories?.length,
  };

  const dataTotalProduct = {
    title: "Total Product",
    svg: "view",
  };
  console.log(stateNotification);

  const addCategoryBreadcrumb = {
    title: "Add Category",
    buttonBack: {
      onListen: () => navigate(-1),
    },
  };

  return (
    <MainLayout>
      <Breadcrumb data={addCategoryBreadcrumb} />
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

export default AddCategory;
