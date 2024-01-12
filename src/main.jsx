import React from "react";
import ReactDOM from "react-dom/client";
import "./common/sass/index.scss";
import { AppProvider } from "./common/providers";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider />
  </React.StrictMode>
);
