import React from "react";

const Table = ({ data, titles, classname, onListen }) => {
  const renderItemTable = (item) => {
    const valueitem = [];
    const arrVals = Object.values(item);
    for (let index = 0; index < arrVals.length; index++) {
      valueitem.push(<td onClick={() => onListen(item)}>{arrVals[index]}</td>);
    }
    return valueitem;
  };

  return (
    <table className={classname}>
      <tbody>
        <tr>
          {titles?.map((title, indx) => (
            <th key={indx}>{title}</th>
          ))}
        </tr>

        {data?.map((item, indx) => (
          <tr key={indx}>
            <td>{indx + 1}</td>
            {renderItemTable(item)}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
