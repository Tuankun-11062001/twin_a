import React, { useState } from "react";
import Select from "./widget/select";
import Svgs from "../localData/svgs";
import Table from "./widget/table";
import ChartLine from "./chart";
import FormGroup from "./widget/formGroup";
import Button from "./widget/button";

const Box = ({ type, data, classname }) => {
  switch (type) {
    case "view":
      return <BoxView data={data} classname={classname} />;
    case "viewListToday":
      return <BoxViewListToday data={data} />;
    case "viewList":
      return <BoxList data={data} />;
    case "editProduct":
      return <BoxEditProduct data={data} />;
    case "viewEditProduct":
      return <BoxViewEditProduct data={data} />;
    case "addProduct":
      return <BoxAddProduct data={data} />;
    case "category":
      return <BoxCategory />;
    case "addCategory":
      return <BoxAddCategory data={data} />;
    default:
      return null;
  }
};

const BoxView = ({ data, classname }) => {
  return (
    <div className={classname}>
      <div>
        {data.svg === "$" ? <h2>{data.svg}</h2> : <Svgs type={data.svg} />}

        <p>{data.title}</p>
      </div>
      <h3>{data.view || data.money || data.total}</h3>
      <ChartLine />
    </div>
  );
};

const BoxViewListToday = ({ data }) => {
  return (
    <div className="box box_view_list">
      <Svgs type={data.svg} />
      <p>{data.title}</p>
      <h3>{data.view}</h3>
      <Select
        data={data.dataSelect}
        onListen={() => console.log("change")}
        classname="select select_view_list"
      />
      <ul>
        {data.dataList?.map((data, indx) => (
          <li key={indx}>
            <div>
              <p>{indx + 1}</p>
              <p>{data.code}</p>
              <p>{data.title}</p>
            </div>
            <p>{data.view}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const BoxList = ({ data }) => {
  return (
    <div className="box box_list">
      <Svgs type={data.svg} />
      <div className="box_list_head">
        <p>{data.title + `(${data.total})`}</p>
        <Select
          data={data?.dataViewSelect}
          onListen={() => console.log("change")}
          classname="select select_list"
        />
      </div>
      <Table
        onListen={data?.navigateDetailProduct}
        data={data?.dataView}
        titles={data?.titleTable}
        classname="table table_list"
      />
    </div>
  );
};

const BoxEditProduct = ({ data }) => {
  return (
    <div className="box box_edit_product">
      <div className="box_edit_product_head">
        <Svgs type="info" />
        <Select
          data={data.dataSelect}
          classname="select select_publish"
          value={data.dataProduct.publish}
          onListen={data.formListen}
          name="publish"
        />
      </div>

      <FormGroup
        type="normal"
        classnameFormGroup="form_group"
        lable="Code Product"
        inputClassname="input input_form_group"
        inputListen={data.formListen}
        inputName="code"
        inputValue={data.dataProduct.code}
      />
      <FormGroup
        type="normal"
        classnameFormGroup="form_group"
        lable="Title"
        inputClassname="input input_form_group"
        inputListen={data.formListen}
        inputName="title"
        inputValue={data.dataProduct.title}
      />

      <FormGroup
        type="add"
        classnameFormGroup="form_group"
        lable="Image"
        classnameButton="button button_form_add"
        classnameDisplayColor="form_group_display_color"
        buttonListen={data.onListenAddOne}
        inputClassname="input input_form_group"
        inputListen={data.formListen}
        inputName="name"
        dataListImage={data.dataProduct.image}
        addOneColor={data.isOneColor}
        addOneColorListen={data.onListenAddOneColor}
        onListenIsAddOneColor={data.onListenAddOne}
        classnameListInput="form_group form_group_list_input"
        onListenRemoveColor={data.removeColor}
      />

      <FormGroup
        type="select"
        classnameFormGroup="form_group"
        classnameSelect="select select_edit_category"
        lable="Category"
        dataSelect={data.dataCategorySelect}
        inputName="category"
        inputValue={data.dataProduct.category}
        inputListen={data.formListen}
      />

      <FormGroup
        type="normal"
        classnameFormGroup="form_group"
        lable="Price"
        inputClassname="input input_form_group"
        inputListen={data.formListen}
        inputName="price"
        inputValue={data.dataProduct.price}
      />

      <FormGroup
        type="select"
        classnameFormGroup="form_group"
        lable="Partner"
        dataSelect={data.dataParnerSelect}
        classnameSelect="select select_edit_product"
        inputValue={data.dataProduct.partner}
        inputName="partner"
        inputListen={data.formListen}
      />

      <FormGroup
        type="normal"
        classnameFormGroup="form_group"
        lable="Profit"
        inputClassname="input input_form_group"
        inputListen={data.formListen}
        inputName="profit"
        inputValue={data.dataProduct.profit}
      />

      <FormGroup
        type="area"
        classnameFormGroup="form_group"
        lable="Description"
        classnameArea="area"
        inputClassname="input input_form_group"
        inputListen={data.formListen}
        inputName="description"
        inputValue={data.dataProduct.description}
      />

      <Button title="Save" classname="button " onListen={data.onListenSave} />
    </div>
  );
};

const BoxViewEditProduct = ({ data }) => {
  return (
    <div className="box box_view_edit_product">
      <div className="box_view_edit_product_head">
        <Svgs type="view" />
        <p>Total views today</p>
      </div>
      <div className="box_view_edit_product_body">
        <BoxProduct data={data} />
      </div>
    </div>
  );
};

const BoxProduct = ({ data }) => {
  return (
    <div className="box box_product">
      <img src={data.dataProduct.currentImage} />
      <h3>{data.dataProduct.title}</h3>
      <div className="box_product_content">
        <div>
          <p>ID product</p>
          <p>{data.dataProduct.code}</p>
        </div>
        <div>
          <p>partner</p>
          <p>{data.dataProduct.partner}</p>
        </div>
        <div>
          <p>category</p>
          <p>{data.dataProduct.category}</p>
        </div>
      </div>
      <div className="box_product_colors">
        {data.dataProduct.image.map((color, indx) => (
          <span
            key={indx}
            onClick={(e) => data.onChangeColor(indx, e)}
            style={{ background: color.color }}
          ></span>
        ))}
      </div>
      <p className="box_product_price">${data.dataProduct.price}</p>
    </div>
  );
};

const BoxAddProduct = ({ data }) => {
  return (
    <div className="box box_edit_product">
      <div className="box_edit_product_head">
        <Svgs type="info" />
        <Select
          data={data.selectPublished.data}
          classname={data.selectPublished.classname}
          value={data.selectPublished.value}
          onListen={data.selectPublished.onListen}
          name={data.selectPublished.name}
        />
      </div>

      <FormGroup type={data.formGroupCode.type} data={data.formGroupCode} />
      <FormGroup type={data.formGroupTitle.type} data={data.formGroupTitle} />
      <FormGroup type={data.formGroupImage.type} data={data.formGroupImage} />
      <FormGroup
        type={data.formGroupCategory.type}
        data={data.formGroupCategory}
      />
      <FormGroup type={data.formGroupPrice.type} data={data.formGroupPrice} />
      <FormGroup
        type={data.formGroupPartner.type}
        data={data.formGroupPartner}
      />

      <FormGroup type={data.formGroupProfit.type} data={data.formGroupProfit} />
      <FormGroup
        type={data.formGroupDescription.type}
        data={data.formGroupDescription}
      />
      <Button title="Create" classname="button " onListen={data.onListenSave} />
    </div>
  );
};

const BoxCategory = () => {
  return (
    <div className="box box_category">
      <h3>Category</h3>
      <div className="box_category_list">
        <div className="box_category_item">
          <div className="box_category_item_left">
            <p>stt</p>
            <p>title</p>
            <p>number</p>
          </div>
          <div>
            <Button title="view" classname="button button_category_view" />
            <Button title="delete" classname="button button_category_delete" />
          </div>
        </div>
      </div>
    </div>
  );
};

const BoxAddCategory = ({ data }) => {
  return (
    <div className="box box_edit_product">
      <div className="box_edit_product_head">
        <Svgs type="info" />
      </div>

      <FormGroup
        type={data.formGroupCategoryCode.type}
        data={data.formGroupCategoryCode}
      />
      <FormGroup
        type={data.formGroupCategoryTitle.type}
        data={data.formGroupCategoryTitle}
      />
      <FormGroup
        type={data.formGroupCategoryDescription.type}
        data={data.formGroupCategoryDescription}
      />

      <Button title="Create" classname="button " onListen={data.handleCreate} />
    </div>
  );
};

export default Box;
