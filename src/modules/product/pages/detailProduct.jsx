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

import { enumPublish } from "../../../common/enum/publish";

import { useDispatch, useSelector } from "react-redux";
import { getAllCategoriesThunk } from "../../../common/providers/slices/categorySlice";
import { getAllPartnerThunk } from "../../../common/providers/slices/partnerSlice";
import {
  askDelProduct,
  closeMessage,
  deleteProductThunk,
  editProductThunk,
  getProductByID,
} from "../../../common/providers/slices/productSlice";
import { enumSeason } from "../../../common/enum/season";
import { enumHotProduct } from "../../../common/enum/hotProduct";
import { enumSaleProduct } from "../../../common/enum/saleProduct";
import NotificationInfo, {
  NotificationAsk,
} from "../../../common/components/notification";

const DetailProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dataPrevRoute = location.state;
  const dispatch = useDispatch();
  const { product, loading, notification, message, notificationEdit } =
    useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);
  const { partners } = useSelector((state) => state.partner);

  const [dataProduct, setDataProduct] = useState({});

  console.log("state product", dataProduct);
  console.log("product", product);

  useEffect(() => {
    (async () => {
      dispatch(getProductByID(dataPrevRoute));
      if (categories.length < 1) {
        dispatch(getAllCategoriesThunk());
      }

      if (partners.length < 1) {
        dispatch(getAllPartnerThunk());
      }
    })();
  }, []);

  useEffect(() => {
    setDataProduct(product);
  }, [product]);

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
    dispatch(editProductThunk(dataProduct));
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
    //                          form group seasson
    //  =================================================================

    formGroupSeason: {
      type: "select",
      classnameFormGroup: "form_group",
      lable: "Season",
      dataSelect: enumSeason.selects || [],
      classnameSelect: "select select_edit_product",
      inputValue: dataProduct.season,
      inputName: "season",
      inputListen: formListen,
    },

    //  =================================================================
    //                          Hot product select
    //  =================================================================

    selectHotProduct: {
      name: "hotProduct",
      onListen: formListen,
      value: dataProduct.hotProduct,
      classname: "select select_publish",
      data: enumHotProduct.selects,
    },
    //  =================================================================
    //                          Sale Product select
    //  =================================================================

    selectSaleProduct: {
      name: "saleProduct",
      onListen: formListen,
      value: dataProduct.saleProduct,
      classname: "select select_publish",
      data: enumSaleProduct.selects,
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
      dataSelect: categories || [],
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
      dataSelect: partners,
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
    dispatch(askDelProduct(dataProduct));
  };
  const handleAcceptDel = async () => {
    dispatch(deleteProductThunk(dataProduct));
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
            {/* <div className="product_detail_page_right">
              <BoxViewEditProduct data={dataViewEdit} />
            </div> */}
          </div>
        </MainLayout>
      ) : (
        <NotFound404 />
      )}
      {notification && (
        <NotificationAsk
          info={message}
          handleClose={() => dispatch(closeMessage())}
          handleAccept={handleAcceptDel}
        />
      )}
      {notificationEdit && (
        <NotificationInfo
          info={message}
          handleClose={() => dispatch(closeMessage())}
        />
      )}
    </>
  );
};

export default DetailProduct;
