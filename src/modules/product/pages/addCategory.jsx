import React, { useState } from "react";
import MainLayout from "../../../common/layout/mainLayout";
import Breadcrumb from "../../../common/components/breadcrumb";
import Box from "../../../common/components/box";
import { createCategory } from "../../../common/api/categoryAPI";
import { actions, useProviderCategory } from "../../../common/providers";

const AddCategory = () => {
  const [stateCategory, dispatchCategory] = useProviderCategory();

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
    } catch (error) {
      console.log("can't create category", error);
    }
  };

  const data = {
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
    view: stateCategory.categories.length,
  };

  const dataTotalProduct = {
    title: "Total Product",
    svg: "view",
  };
  return (
    <MainLayout>
      <Breadcrumb type="breadcrumbCategoryAdd" title="Create Category" />
      <div className="category category_add">
        <div className="category_add_form">
          <Box type="addCategory" data={data} />
        </div>
        <div className="category_add_view">
          <Box
            type="view"
            data={dataViewTotalCategory}
            classname="box box_view"
          />
          <Box type="view" data={dataTotalProduct} classname="box box_view" />
        </div>
      </div>
    </MainLayout>
  );
};

export default AddCategory;
