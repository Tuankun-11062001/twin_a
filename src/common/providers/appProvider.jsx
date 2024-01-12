import React, { useReducer } from "react";
import MainRouter from "../router/mainRouter";
import {
  ContextNotification,
  ContextProduct,
  ContextCategory,
} from "./context";
import reducerNotification, {
  initStateNotification,
} from "./reducerNotification";
import reducerProduct, { stateInitProduct } from "./reducerProduct";
import reducerCategory, { initStateCategory } from "./reducerCategory";
import logger from "./logger";
const AppProvider = () => {
  const [stateNotification, dispatchNotification] = useReducer(
    logger(reducerNotification),
    initStateNotification
  );

  const [stateProduct, dispatchProduct] = useReducer(
    logger(reducerProduct),
    stateInitProduct
  );

  const [stateCategory, dispatchCategory] = useReducer(
    logger(reducerCategory),
    initStateCategory
  );

  return (
    <ContextNotification.Provider
      value={[stateNotification, dispatchNotification]}
    >
      <ContextCategory.Provider value={[stateCategory, dispatchCategory]}>
        <ContextProduct.Provider value={[stateProduct, dispatchProduct]}>
          <MainRouter />
        </ContextProduct.Provider>
      </ContextCategory.Provider>
    </ContextNotification.Provider>
  );
};

export default AppProvider;
