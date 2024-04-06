import React, { useState } from "react";
import MainLayout from "../../../common/layout/mainLayout";
import Breadcrumb from "../../../common/components/breadcrumb";

import Notification from "../../../common/components/notification";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  BoxAddCategoryAndPartner,
  BoxView,
} from "../../../common/components/box";
import NotificationInfo from "../../../common/components/notification";
import {
  closeMessage,
  createCategoryThunk,
} from "../../../common/providers/slices/categorySlice";
import Loading from "../../../common/pages/loading";

const AddCategory = () => {
  const navigate = useNavigate();
  const { categories, loading, message } = useSelector(
    (state) => state.category
  );
  const dispatch = useDispatch();

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
      dispatch(createCategoryThunk(dataCategory));
    } catch (error) {
      console.log("can't create category", error);
    }
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
    view: categories?.length,
  };

  const dataTotalProduct = {
    title: "Total Product",
    svg: "view",
  };

  const addCategoryBreadcrumb = {
    title: "Add Category",
    buttonBack: {
      onListen: () => navigate(-1),
    },
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <MainLayout>
          <Breadcrumb data={addCategoryBreadcrumb} />
          <div className="category category_add">
            <BoxAddCategoryAndPartner data={data} />
            <BoxView
              data={dataViewTotalCategory}
              classname="box box_view_small"
            />
            <BoxView data={dataTotalProduct} classname="box box_view_small" />
          </div>
          {message && (
            <NotificationInfo
              info={message}
              handleClose={() => dispatch(closeMessage(""))}
            />
          )}
        </MainLayout>
      )}
    </>
  );
};

export default AddCategory;
