import React from "react";
import ReactDOM from "react-dom/client";
import "./common/sass/index.scss";
import ProviderStore from "./common/providers/providerStore.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProviderStore/>
  </React.StrictMode>
);
