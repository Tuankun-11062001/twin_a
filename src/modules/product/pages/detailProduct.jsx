import React, { useEffect, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MainLayout from "../../../common/layout/mainLayout";
import Breadcrumb from "../../../common/components/breadcrumb";
import NotFound404 from "../../../common/pages/notFound404";
import Box from "../../../common/components/box";
import { productData } from "../../../common/localData/productData";

const DetailProduct = () => {
  const [getDataRoute, setGetDataRoute] = useState();
  const location = useLocation();

  useEffect(() => {
    const dataPrevRoute = location.state;
    setGetDataRoute(dataPrevRoute);
  }, []);

  const dataSelect = [
    {
      title: "Publish",
      value: "publish",
    },
    {
      title: "Unpublish",
      value: "unpublish",
    },
  ];

  const dataCategorySelect = [
    { title: "all", value: "all" },
    { title: "t-shirt", value: "t-shirt" },
  ];

  const dataParnerSelect = [
    { title: "Printify", value: "printify" },
    { title: "Printub", value: "printub" },
  ];

  const [dataProduct, setDataProduct] = useState(productData[0]);

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
    dataFake.image.splice(indx, 1);
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
    console.log(dataFake);
  };

  const data = {
    dataProduct,
    isOneColor,
    onListenAddOne,
    onListenAddOneColor,
    formListen,
    removeColor,
    dataSelect,
    dataCategorySelect,
    dataParnerSelect,
    onListenSave,
  };

  const dataViewProduct = {
    dataProduct,
    onChangeColor,
  };

  return (
    <>
      {getDataRoute ? (
        <MainLayout>
          <Breadcrumb
            type="breadcrumbProductDetail"
            title="Detail Product"
            params={getDataRoute}
          />
          <div className="product product_detail_page">
            <div className="product_detail_page_left">
              <Box type="editProduct" data={data} />
            </div>
            <div className="product_detail_page_right">
              <Box type="viewEditProduct" data={dataViewProduct} />
              <div className="product_detail_page_right_bottom">
                <Box type="earn" data={{}} />
              </div>
            </div>
          </div>
        </MainLayout>
      ) : (
        <NotFound404 />
      )}
    </>
  );
};

export default DetailProduct;
