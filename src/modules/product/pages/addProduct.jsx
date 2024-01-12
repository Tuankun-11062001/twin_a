import React, { useEffect, useState } from "react";
import MainLayout from "../../../common/layout/mainLayout";
import Breadcrumb from "../../../common/components/breadcrumb";
import Box from "../../../common/components/box";
import Notification from "../../../common/components/notification";
import {
  actions,
  useProviderCategory,
  useProviderNotification,
} from "../../../common/providers";
import { getAllCategories } from "../../../common/api/categoryAPI";

const AddProduct = () => {
  const [stateCategory, dispatchCategory] = useProviderCategory();
  const [stateNotification, dispatchNotification] = useProviderNotification();
  //  =================================================================
  //                          Loading category
  //  =================================================================
  useState(() => {
    (async () => {
      if (stateCategory.categories) {
        const getCategories = await getAllCategories();
        return dispatchCategory(actions.getCategories(getCategories));
      }
    })();
  }, []);

  const [dataProduct, setDataProduct] = useState({
    publish: "",
    code: "",
    title: "",
    currentImage: "",
    image: [],
    category: "",
    partner: "",
    price: 0,
    views: 0,
    profit: 0,
    buy: 0,
    description: "",
  });

  const [isOneColor, setIsAddOneColor] = useState(false);

  const dataSelectPublish = [
    {
      title: "Publish",
      value: "publish",
    },
    {
      title: "Unpublish",
      value: "unpublish",
    },
  ];

  const dataParnerSelect = [
    { title: "none", value: "none" },
    { title: "Printify", value: "printify" },
    { title: "Printub", value: "printub" },
  ];

  const onListenAddOne = () => {
    setIsAddOneColor(!isOneColor);
  };

  const onListenAddOneColor = (data) => {
    console.log("image add", data);
    setDataProduct((prev) => {
      return {
        ...prev,
        image: [...prev.image, data],
      };
    });

    console.log(dataProduct);
  };

  const formListen = (e) => {
    const { name, value } = e.target;
    setDataProduct((prev) => ({ ...prev, [name]: value }));
  };

  const removeColor = (indx) => {
    dataProduct.image.splice(indx, 1);
    setDataProduct((prev) => {
      return {
        ...prev,
        image: [...prev.image],
      };
    });
  };

  const onChangeColor = (indx, e) => {
    const allColor = document.querySelectorAll(".box_product_colors span");
    allColor.forEach((color) => {
      color.classList.remove("active");
    });
    e.target.classList.add("active");

    setDataProduct((prev) => ({
      ...prev,
      currentImage: prev.image[indx].colorLink,
    }));
  };

  const onListenSave = () => {
    console.log(dataProduct);
    dispatch(actions.setNotificationAdd(true));
  };

  const data = {
    //  =================================================================
    //                          publish select
    //  =================================================================

    selectPublished: {
      name: "publish",
      onListen: formListen,
      value: dataProduct.publish,
      classname: "select select_publish",
      data: dataSelectPublish,
    },

    //  =================================================================
    //                          form group code
    //  =================================================================

    formGroupCode: {
      type: "normal",
      classnameFormGroup: "form_group",
      lable: "Code Product",
      inputClassname: "input input_form_group",
      inputListen: formListen,
      inputName: "code",
      inputValue: dataProduct.code,
    },

    //  =================================================================
    //                          form group title
    //  =================================================================

    formGroupTitle: {
      type: "normal",
      classnameFormGroup: "form_group",
      lable: "Title",
      inputClassname: "input input_form_group",
      inputListen: formListen,
      inputName: "title",
      inputValue: dataProduct.title,
    },

    //  =================================================================
    //                          form group Image
    //  =================================================================

    formGroupImage: {
      type: "add",
      classnameFormGroup: "form_group",
      lable: "Image",
      classnameButton: "button button_form_add",
      classnameDisplayColor: "form_group_display_color",
      buttonListen: onListenAddOne,
      inputClassname: "input input_form_group",
      inputListen: formListen,
      dataListImage: dataProduct.image,
      addOneColor: isOneColor,
      addOneColorListen: onListenAddOneColor,
      onListenIsAddOneColor: onListenAddOne,
      classnameListInput: "form_group form_group_list_input",
      onListenRemoveColor: removeColor,
    },

    //  =================================================================
    //                          form group category
    //  =================================================================

    formGroupCategory: {
      type: "select",
      classnameFormGroup: "form_group",
      lable: "Category",
      dataSelect: stateCategory.categories,
      classnameSelect: "select select_edit_product",
      inputValue: dataProduct.category,
      inputName: "category",
      inputListen: formListen,
    },

    //  =================================================================
    //                          form group price
    //  =================================================================

    formGroupPrice: {
      type: "normal",
      classnameFormGroup: "form_group",
      lable: "Price",
      inputClassname: "input input_form_group",
      inputListen: formListen,
      inputName: "price",
      inputValue: dataProduct.price,
    },

    //  =================================================================
    //                          form group partner
    //  =================================================================

    formGroupPartner: {
      type: "select",
      classnameFormGroup: "form_group",
      lable: "Partner",
      dataSelect: dataParnerSelect,
      classnameSelect: "select select_edit_product",
      inputValue: dataProduct.partner,
      inputName: "partner",
      inputListen: formListen,
    },

    //  =================================================================
    //                          form group profit
    //  =================================================================

    formGroupProfit: {
      type: "normal",
      classnameFormGroup: "form_group",
      lable: "Profit",
      inputClassname: "input input_form_group",
      inputListen: formListen,
      inputName: "profit",
      inputValue: dataProduct.profit,
    },

    //  =================================================================
    //                          form group description
    //  =================================================================

    formGroupDescription: {
      type: "area",
      classnameFormGroup: "form_group",
      lable: "Description",
      inputClassname: "input input_form_group",
      inputListen: formListen,
      inputName: "description",
      inputValue: dataProduct.description,
      classnameArea: "area",
    },
  };

  const dataViewEdit = {
    dataProduct,
    onChangeColor,
  };

  return (
    <MainLayout>
      <Breadcrumb
        type="breadcrumbProductAddd"
        title="Create Product"
        codeID={dataProduct.code}
      />
      <div className="product product_detail_page">
        <div className="product_detail_page_left">
          <Box type="addProduct" data={data} />
        </div>
        <div className="product_detail_page_right">
          <Box type="viewEditProduct" data={dataViewEdit} />
          <div className="product_detail_page_right_bottom">
            <Box type="productTotal" />
            <Box type="totalCategory" />
          </div>
        </div>
      </div>
      {stateNotification.notification.addProduct && (
        <Notification type="addProduct" />
      )}
    </MainLayout>
  );
};

export default AddProduct;
