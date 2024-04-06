import React, { useState } from "react";
import MainLayout from "../../../common/layout/mainLayout";
import Breadcrumb from "../../../common/components/breadcrumb";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  BoxAddCategoryAndPartner,
  BoxView,
} from "../../../common/components/box";
import NotificationInfo from "../../../common/components/notification";
import {
  addPartnerThunk,
  closeMessage,
} from "../../../common/providers/slices/partnerSlice";
import Loading from "../../../common/pages/loading";

const AddPartner = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { partners, message, loading, notification } = useSelector(
    (state) => state.partner
  );

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
      dispatch(addPartnerThunk(dataPartner));
    } catch (error) {
      console.log("can't create category", error);
    }
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
    view: partners?.length,
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
    <>
      {loading ? (
        <Loading />
      ) : (
        <MainLayout>
          <Breadcrumb data={addPartnerBreadcrumb} />
          <div className="category category_add">
            <BoxAddCategoryAndPartner data={data} />
            <BoxView
              data={dataViewTotalCategory}
              classname="box box_view_small"
            />
            <BoxView data={dataTotalProduct} classname="box box_view_small" />
          </div>
          {notification && (
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

export default AddPartner;
