import React, { useEffect, useState } from "react";
import MainLayout from "../../../common/layout/mainLayout";
import Breadcrumb from "../../../common/components/breadcrumb";
import {
  BoxAddProduct,
  BoxView,
  BoxViewEditProduct,
} from "../../../common/components/box";
import Notification from "../../../common/components/notification";
import {
  actions,
  useProviderCategory,
  useProviderNotification,
  useProviderPartner,
  useProviderProduct,
} from "../../../common/providers";
import { getAllCategories } from "../../../common/api/categoryAPI";
import { useNavigate } from "react-router-dom";
import { getAllPartners } from "../../../common/api/partnerAPI";
import { createProduct } from "../../../common/api/productAPI";
import { enumPublish } from "../../../common/enum/publish";

const AddProduct = () => {
  const navigate = useNavigate();
  const [stateCategory, dispatchCategory] = useProviderCategory();
  const [statePartner, dispatchPartner] = useProviderPartner();
  const [stateProduct, dispatchProduct] = useProviderProduct();
  const [stateNotification, dispatchNotification] = useProviderNotification();
  //  =================================================================
  //                          Loading category
  //  =================================================================

  useEffect(() => {
    (async () => {
      if (statePartner.partners.length < 1) {
        const getPartners = await getAllPartners();
        dispatchPartner(actions.getPartners(getPartners));
      }
      if (stateCategory.categories.length < 1) {
        const getCategories = await getAllCategories();
        dispatchCategory(actions.getCategories(getCategories));
      }
      return;
    })();
  }, []);

  const [dataProduct, setDataProduct] = useState({
    publish: true,
    code: "",
    title: "",
    currentImage: "",
    image: [],
    category: "",
    partner: "",
    price: "",
    profit: "",
    description: "",
  });

  const [isOneColor, setIsAddOneColor] = useState(false);

  const onListenAddOne = () => {
    setIsAddOneColor(!isOneColor);
  };

  const onListenAddOneColor = (data) => {
    setDataProduct((prev) => {
      return {
        ...prev,
        image: [...prev.image, data],
      };
    });
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

  const onListenCreate = async () => {
    const product = await createProduct(dataProduct);
    if (product) {
      dispatchProduct(actions.createProduct(product));
      dispatchNotification(actions.setNotificationAdd(true));
    }
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
      data: enumPublish.selects,
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
      dataSelect: stateCategory?.categories || [],
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
      dataSelect: statePartner.partners,
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
    onListenCreate,
  };

  const dataViewEdit = {
    dataProduct,
    onChangeColor,
  };

  const addProductBreadcrumb = {
    buttonBack: {
      onListen: () => navigate(-1),
    },
    title: "Create product",
    param: dataProduct.code,
  };

  const dataNotification = {
    title: "Notification",
    body: "Product created successfully",
  };

  return (
    <MainLayout>
      <Breadcrumb data={addProductBreadcrumb} />
      <div className="product product_detail_page">
        <div className="product_detail_page_left">
          <BoxAddProduct type="addProduct" data={data} />
        </div>
        <div className="product_detail_page_right">
          <BoxViewEditProduct type="viewEditProduct" data={dataViewEdit} />
          <div className="product_detail_page_right_bottom">
            {/* <BoxView />
            <BoxView /> */}
          </div>
        </div>
      </div>
      {stateNotification.notification.add && (
        <Notification type="add" data={dataNotification} />
      )}
    </MainLayout>
  );
};

export default AddProduct;
