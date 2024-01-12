import React from "react";

const Input = ({
  placeholder,
  value,
  name,
  onListen,
  type,
  classname,
  disabled = false,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onListen}
      className={classname}
      disabled={disabled}
    />
  );
};

export default Input;
