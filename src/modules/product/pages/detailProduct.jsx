import React, { useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "../../../common/layout/mainLayout";
import Breadcrumb from "../../../common/components/breadcrumb";
import NotFound404 from "../../../common/pages/notFound404";
import {
  BoxEditProduct,
  BoxView,
  BoxViewEditProduct,
} from "../../../common/components/box";
import {
  actions,
  useProviderCategory,
  useProviderNotification,
  useProviderPartner,
  useProviderProduct,
} from "../../../common/providers";
import {
  deleteProduct,
  getProductById,
  updateProduct,
} from "../../../common/api/productAPI";
import { enumPublish } from "../../../common/enum/publish";
import Notification from "../../../common/components/notification";
import { getAllCategories } from "../../../common/api/categoryAPI";
import { getAllPartners } from "../../../common/api/partnerAPI";

const DetailProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dataPrevRoute = location.state;

  const [stateCategory, dispatchCategory] = useProviderCategory();
  const [statePartner, dispatchPartner] = useProviderPartner();
  const [stateNotification, dispatchNotification] = useProviderNotification();
  const [stateProduct, dispatchProduct] = useProviderProduct();

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

  useEffect(() => {
    (async () => {
      if (dataPrevRoute) {
        const product = await getProductById(dataPrevRoute);
        setDataProduct(product);
      }
      if (stateCategory.categories.length < 1) {
        const listCategory = await getAllCategories();
        dispatchCategory(actions.getCategories(listCategory));
      }

      if (statePartner.partners.length < 1) {
        const listPartners = await getAllPartners();
        dispatchPartner(actions.getPartners(listPartners));
      }
    })();
  }, []);

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

  const onListenSave = async () => {
    console.log("data", dataProduct);
    const listProduct = await updateProduct(dataProduct);
    dispatchProduct(actions.getProducts(listProduct));
    dispatchNotification(actions.setNotificationAdd(true));
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
      dataSelect: stateCategory.categories || [],
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

    onListenSave,
  };

  const dataViewEdit = {
    dataProduct,
    onChangeColor,
  };

  const handleDelete = () => {
    dispatchNotification(actions.setNotificationDelete(true));
  };
  const handleYesDelete = async () => {
    const listProduct = await deleteProduct(dataProduct._id);
    if (listProduct) {
      dispatchProduct(actions.getProducts(listProduct));
      dispatchNotification(actions.setNotificationDelete(false));
      setTimeout(() => navigate(-1), 1000);
    }
  };
  const dataNotificationDel = {
    title: "Delete Product",
    code: dataProduct.code,
    body: "Are you sure you want to delete this product?",
    handleYesDelete,
  };

  const detailProductBreadcrumb = {
    buttonBack: {
      onListen: () => navigate(-1),
    },
    title: "Detail product",
    param: dataProduct.code,
    buttons: [
      {
        title: "Delete",
        svg: "trash",
        classname: "button button_product_delete",
        onListen: handleDelete,
      },
    ],
  };

  return (
    <>
      {dataPrevRoute ? (
        <MainLayout>
          <Breadcrumb data={detailProductBreadcrumb} />
          <div className="product product_detail_page">
            <div className="product_detail_page_left">
              <BoxEditProduct data={data} />
            </div>
            <div className="product_detail_page_right">
              <BoxViewEditProduct data={dataViewEdit} />
              <div className="product_detail_page_right_bottom">
                <BoxView type="earn" data={{}} />
              </div>
            </div>
          </div>
          {stateNotification.notification.add && (
            <Notification
              type="add"
              data={{ title: "Notification", body: "Change Product Success!" }}
            />
          )}
          {stateNotification.notification.delete && (
            <Notification type="delete" data={dataNotificationDel} />
          )}
        </MainLayout>
      ) : (
        <NotFound404 />
      )}
    </>
  );
};

export default DetailProduct;
