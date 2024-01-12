import React from "react";

const Button = ({ onListen, title, classname, svg, img }) => {
  return (
    <button onClick={onListen} className={classname}>
      {title || <img src={img} /> || svg}
      {svg}
    </button>
  );
};

export default Button;
