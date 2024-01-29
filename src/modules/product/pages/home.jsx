import React, { useEffect } from "react";
import MainLayout from "../../../common/layout/mainLayout";
import Breadcrumb from "../../../common/components/breadcrumb";
import { BoxList, BoxView, BoxViewList } from "../../../common/components/box";
import { useNavigate } from "react-router-dom";
import { actions, useProviderProduct } from "../../../common/providers";
import { getAllProduct } from "../../../common/api/productAPI";
import { enumProduct } from "../../../common/enum/product";
import { enumMoney } from "../../../common/enum/money";

const HomeProduct = () => {
  const navigate = useNavigate();
  const [stateProduct, dispatchProduct] = useProviderProduct();

  // =================================================================
  //                    Loading data
  // =================================================================

  useEffect(() => {
    (async () => {
      if (stateProduct.products.length < 1) {
        const listProduct = await getAllProduct();
        dispatchProduct(actions.getProducts(listProduct));
      }
    })();
  }, []);

  const dataProductTotal = {
    svg: enumProduct.svg,
    title: enumProduct.titleTotal,
    total: stateProduct.products.length,
  };

  const dataProductMoney = {
    svg: enumMoney.product.svg,
    title: enumMoney.product.title,
    money: 300,
  };

  const dataViewListProductToday = {
    title: enumProduct.viewList.title,
    view: enumProduct.viewList.view,
    svg: enumProduct.viewList.svg,
    dataTable: {
      type: enumProduct.viewList.table.type,
      dataTableTitle: enumProduct.viewList.table.titles,
      dataList: stateProduct.products,
    },
    selects: enumProduct.viewList.selects,
  };

  const navigateDetail = (item) => {
    navigate(`/product/${item.code}`, { state: item._id });
  };

  const dataListProduct = {
    svg: enumProduct.full.svg,
    title: enumProduct.full.title,
    total: 20,
    selects: enumProduct.full.selects,
    type: enumProduct.full.type,
    dataTable: {
      type: enumProduct.full.table.type,
      titles: enumProduct.full.table.titles,
      dataView: stateProduct.products,
      navigateDetail,
    },
  };

  const productBreadcrum = {
    title: "Product",
    buttons: [
      {
        title: "Partner",
        classname: "button button_category",
        onListen: () => navigate("/product/partner"),
      },
      {
        title: "Category",
        classname: "button button_category",
        onListen: () => navigate("/product/category"),
      },
      {
        title: "Add product",
        classname: "button button_category",
        onListen: () => navigate("/product/add"),
      },
    ],
  };

  return (
    <MainLayout>
      <Breadcrumb data={productBreadcrum} />
      <div className="product product_head">
        <BoxView data={dataProductTotal} classname="box box_view" />
        <BoxView data={dataProductMoney} classname="box box_view" />
        <BoxViewList data={dataViewListProductToday} />
      </div>
      <BoxList data={dataListProduct} />
    </MainLayout>
  );
};

export default HomeProduct;
