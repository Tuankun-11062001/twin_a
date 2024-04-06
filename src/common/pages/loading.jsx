import React from "react";
import loadingSvg from "../assets/loading.svg";

const Loading = () => {
  return (
    <div className="loading">
      <img src={loadingSvg} />
    </div>
  );
};

export default Loading;
