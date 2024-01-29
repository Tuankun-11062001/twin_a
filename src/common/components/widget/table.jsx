import React from "react";
import { enumProduct } from "../../enum/product";

const TableViewList = ({ data }) => {
  return (
    <table className="table table_view_list">
      <tbody>
        <tr>
          {data.dataTableTitle?.map((title, indx) => (
            <th key={indx}>{title}</th>
          ))}
        </tr>
        {data.type === "product"
          ? data.dataList?.map((item, indx) => (
              <tr key={indx} onClick={() => onListen(item)}>
                <td>{indx + 1}</td>
                <td>{item?.code}</td>
                <td>{item?.title}</td>
                <td>{item?.views}</td>
              </tr>
            ))
          : data.dataList?.map((item, indx) => (
              <tr key={indx} onClick={() => onListen(item)}>
                <td>{indx + 1}</td>
                <td>{item?.title}</td>
                <td>{item?.views}</td>
              </tr>
            ))}
      </tbody>
    </table>
  );
};

const TableFull = ({ type, data, titles, classname, onListen }) => {
  console.log(data);
  return (
    <table className={classname}>
      <tbody>
        <tr>
          {titles?.map((title, indx) => (
            <th key={indx}>{title}</th>
          ))}
        </tr>

        {type === enumProduct.full.table.type
          ? data?.map((item, indx) => (
              <tr key={indx} onClick={() => onListen(item)}>
                <td>{indx + 1}</td>
                <td>{item?.code}</td>
                <td>{item?.title}</td>
                <td>{item?.category.title}</td>
                <td>{item?.image.length}</td>
                <td>{item?.partner.title}</td>
                <td>{item?.price}</td>
                <td>{item?.profit}</td>
                <td>{item?.views}</td>
                <td>{item?.publish === true ? "Publish" : "UnPublish"}</td>
                <td>{item?.buy}</td>
                <td>
                  {new Date(item?.createdAt).getDate() +
                    "/" +
                    new Date(item?.createdAt).getMonth() +
                    1}
                </td>
              </tr>
            ))
          : data?.map((item, indx) => (
              <tr
                key={indx}
                onClick={() => onListen(item)}
                className="table_full_blog"
              >
                <td>{indx + 1}</td>
                <td>{item?.title}</td>
                <td>{item?.thumbnail}</td>
                <td>{item?.views}</td>
                <td>{item?.clickAds}</td>
                <td>{item?.descriptions}</td>
                <td>
                  {new Date(item?.createdAt).getDate() +
                    "/" +
                    new Date(item?.createdAt).getMonth() +
                    1}
                </td>
                <td>{item?.publish === true ? "Publish" : "UnPublish"}</td>
              </tr>
            ))}
      </tbody>
    </table>
  );
};

const TableShort = ({ data, classname, titles, type, onListen }) => {
  return (
    <table className={classname}>
      <tbody>
        <tr>
          {titles?.map((title, indx) => (
            <th key={indx}>{title}</th>
          ))}
        </tr>

        {type === "product"
          ? data?.map((item, indx) => (
              <tr key={indx} onClick={() => onListen(item)}>
                <td>{indx + 1}</td>
                <td>{item?.code}</td>
                <td>{item?.title}</td>
                <td>{item?.category.title}</td>
                <td>{item?.partner.title}</td>
                <td>{item?.price}</td>
                <td>{item?.views}</td>
                <td>{item?.buy}</td>
              </tr>
            ))
          : data?.map((item, indx) => (
              <tr key={indx} onClick={() => onListen(item)}>
                <td>{indx + 1}</td>
                <td>{item?.title}</td>
                <td>{item?.views}</td>
                <td>{item?.clickAds}</td>
              </tr>
            ))}
      </tbody>
    </table>
  );
};

const TableFullView = ({ data, classname, onListen }) => {
  const titleViewProduct = ["STT", "code", "Title", "Views"];
  return (
    <table className={classname}>
      <tbody>
        <tr>
          {titleViewProduct?.map((title, indx) => (
            <th key={indx}>{title}</th>
          ))}
        </tr>

        {data?.map((item, indx) => (
          <tr key={indx} onClick={() => onListen(item)}>
            <td>{indx + 1}</td>
            <td>{item?.code}</td>
            <td>{item?.title}</td>
            <td>{item?.view}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { TableFull, TableShort, TableFullView, TableViewList };
