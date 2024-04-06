import React, { useEffect, useState } from "react";
import MainLayout from "../../../common/layout/mainLayout";
import Breadcrumb from "../../../common/components/breadcrumb";
import {
  BoxAddProduct,
  BoxView,
  BoxViewEditProduct,
} from "../../../common/components/box";

import { getAllCategoriesAPI } from "../../../common/api/categoryAPI";
import { useNavigate } from "react-router-dom";
import { getAllPartnersAPI } from "../../../common/api/partnerAPI";
import { createProductAPI } from "../../../common/api/productAPI";
import { enumPublish } from "../../../common/enum/publish";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoriesThunk } from "../../../common/providers/slices/categorySlice";
import { getAllPartnerThunk } from "../../../common/providers/slices/partnerSlice";
import { enumSeason } from "../../../common/enum/season";
import { enumHotProduct } from "../../../common/enum/hotProduct";
import { enumSaleProduct } from "../../../common/enum/saleProduct";
import {
  closeMessage,
  createProductThunk,
} from "../../../common/providers/slices/productSlice";
import NotificationInfo from "../../../common/components/notification";
import Loading from "../../../common/pages/loading";
const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, message, notification, loading } = useSelector(
    (state) => state.product
  );
  const { partners } = useSelector((state) => state.partner);
  const { categories } = useSelector((state) => state.category);

  //  =================================================================
  //                          Loading category
  //  =================================================================

  useEffect(() => {
    (async () => {
      if (partners.length < 1) {
        dispatch(getAllPartnerThunk());
      }
      if (categories.length < 1) {
        dispatch(getAllCategoriesThunk());
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
    linkProduct: "",
    season: "",
    hotProduct: true,
    saleProduct: true,
  });

  console.log(dataProduct);

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
    dispatch(createProductThunk(dataProduct));
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
      dataSelect: categories || [],
      classnameSelect: "select select_edit_product",
      inputValue: dataProduct.category,
      inputName: "category",
      inputListen: formListen,
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
    //                          form group link product
    //  =================================================================

    formGroupLinkProduct: {
      type: "normal",
      classnameFormGroup: "form_group",
      lable: "link Product",
      inputClassname: "input input_form_group",
      inputListen: formListen,
      inputName: "linkProduct",
      inputValue: dataProduct.linkProduct,
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

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
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

export default AddProduct;
