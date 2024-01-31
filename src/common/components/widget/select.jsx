import React from "react";

const Select = ({ data, onListen, classname, value, name }) => {
  return (
    <select onChange={onListen} className={classname} name={name} value={value}>
      {data?.map((sec, indx) => (
        <option value={sec._id || sec.selectValue} key={indx}>
          {sec.title}
        </option>
      ))}
    </select>
  );
};

export default Select;
