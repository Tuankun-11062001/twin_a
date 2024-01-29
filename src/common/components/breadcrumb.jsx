import React from "react";
import Button from "./widget/button";
import Svgs from "../localData/svgs";

const Breadcrumb = ({ data }) => {
  return (
    <div className="breadcrumb">
      <div className="breadcrumb_left">
        {data?.buttonBack && (
          <Button
            svg={<Svgs type="arrow" />}
            classname="button button_breadcrum_detail_back"
            onListen={data.buttonBack.onListen}
          />
        )}
        <h2>{data.title}</h2>
        <h2>{data?.param}</h2>
      </div>
      <div className="breadcrumb_right">
        {data.buttons?.map((btn) => (
          <Button
            title={btn.title}
            classname={btn.classname}
            onListen={btn.onListen}
            svg={<Svgs type={btn.svg} />}
          />
        ))}
      </div>
    </div>
  );
};

export default Breadcrumb;
