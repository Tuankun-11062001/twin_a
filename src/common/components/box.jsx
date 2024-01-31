import React from "react";
import Select from "./widget/select";
import Svgs from "../localData/svgs";
import { TableFull, TableShort, TableViewList } from "./widget/table";
import ChartLine from "./chart";
import FormGroup from "./widget/formGroup";
import Button from "./widget/button";
import { useProviderCategory } from "../providers";
import { enumProduct } from "../enum/product";
import { enumBlog } from "../enum/blog";
import Tiptap from "./tiptap";

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
    case "viewListCategoryAndPartner":
      return <BoxViewList data={data} />;
    case "addCategoryAndPartner":
      return <BoxAdd data={data} />;
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

const BoxViewList = ({ data }) => {
  return (
    <div className="box box_view_list">
      <Svgs type={data.svg} />
      <p>{data.title}</p>
      <h3>{data.view}</h3>
      <Select
        data={data.selects}
        onListen={() => console.log("change")}
        classname="select select_view_list"
      />
      <TableViewList data={data.dataTable} />
    </div>
  );
};

const BoxList = ({ data }) => {
  return (
    <>
      {data.type === enumProduct.listShort.type ||
      data.type === enumBlog.listShort.type ? (
        <div className="box box_list">
          <Svgs type={data.svg} />
          <div className="box_list_head">
            <p>{data.title + `(${data.total})`}</p>
            <Select
              data={data?.selects}
              onListen={() => console.log("change")}
              classname="select select_list"
            />
          </div>
          <TableShort
            type={data.dataTable.type}
            onListen={data.dataTable?.navigateDetail}
            data={data.dataTable?.dataView}
            titles={data.dataTable?.titles}
            classname="table table_list"
          />
        </div>
      ) : (
        <div className="box box_list">
          <Svgs type={data?.svg} />
          <div className="box_list_head">
            <p>{data?.title + `(${data?.total})`}</p>
            <Select
              data={data?.selects}
              onListen={() => console.log("change")}
              classname="select select_list"
            />
          </div>
          <TableFull
            type={data?.dataTable.type}
            onListen={data.dataTable?.navigateDetail}
            data={data.dataTable?.dataView}
            titles={data.dataTable?.titles}
            classname="table table_list"
          />
        </div>
      )}
    </>
  );
};

const BoxEditProduct = ({ data }) => {
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
        type={data.formGroupLinkProduct.type}
        data={data.formGroupLinkProduct}
      />
      <FormGroup
        type={data.formGroupDescription.type}
        data={data.formGroupDescription}
      />
      <Button
        title="Create"
        classname="button "
        onListen={data.onListenCreate}
      />
    </div>
  );
};

const BoxViewListCategoryAndPartner = ({ data }) => {
  return (
    <div className="box box_category">
      <h3>{data.title}</h3>
      <div className="box_category_list">
        {data.list?.map((item, indx) => (
          <div className="box_category_item" key={indx}>
            <div className="box_category_item_left">
              {data.type === "category" && <p>{item.categoryCode}</p>}
              <p>{item.title}</p>
              <p>number</p>
            </div>
            <div>
              <Button
                title="view"
                classname="button button_category_view"
                onListen={() => data.handleView(item)}
              />
              <Button
                title="delete"
                classname="button button_category_delete"
                onListen={() => data.handleDelete(item)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BoxAddCategoryAndPartner = ({ data }) => {
  return (
    <div className="box box_add_category">
      <div className="box_add_category_head">
        <Svgs type="info" />
      </div>
      {data.type === "category" && (
        <FormGroup
          type={data.formGroupCategoryCode.type}
          data={data.formGroupCategoryCode}
        />
      )}

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

const BoxAddBlog = ({ data }) => {
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

      <FormGroup type={data.formGroupTitle.type} data={data.formGroupTitle} />
      <FormGroup
        type={data.formGroupThumbnail.type}
        data={data.formGroupThumbnail}
      />
      <FormGroup
        type={data.formGroupDescription.type}
        data={data.formGroupDescription}
      />
      <p>Body</p>
      <Tiptap data={data.formGroupBody} />
      <Button
        title="Create"
        classname="button "
        onListen={data.onListenCreate}
      />
    </div>
  );
};

const BoxViewBlog = ({ data, viewBody }) => {
  return (
    <div className="box box_blog_view_card">
      <div className="head">
        <p>View Card</p>
        <Button title="view body" classname="button" onListen={viewBody} />
      </div>
      <div className="body">
        <img src={data.thumbnail} />
        <div className="content">
          <span>{data.date || "date"}</span>
          <h3>{data.title}</h3>
          <p>{data.description}</p>
        </div>
      </div>
    </div>
  );
};

const BoxViewBlogBody = ({ data, close }) => {
  return (
    <div className="box box_blog_view_body">
      <div className="head">
        <p>Review Blog Body</p>
        <Button onListen={close} title="close" />
      </div>
      <div className="body" dangerouslySetInnerHTML={{ __html: data }}></div>
    </div>
  );
};

export {
  BoxView,
  BoxViewList,
  BoxList,
  BoxViewListCategoryAndPartner,
  BoxAddCategoryAndPartner,
  BoxEditProduct,
  BoxViewEditProduct,
  BoxAddProduct,
  BoxAddBlog,
  BoxViewBlog,
  BoxViewBlogBody,
};
