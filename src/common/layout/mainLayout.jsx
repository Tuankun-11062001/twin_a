import React from "react";
import Navigation from "./navigation";
import NavTop from "./navTop";

const MainLayout = ({ children }) => {
  return (
    <div className="layout layout_main">
      <Navigation />
      <NavTop />
      <div className="layout_body">{children}</div>
    </div>
  );
};

export default MainLayout;
