import React, { useReducer } from "react";
import MainRouter from "../router/mainRouter";
import {
  ContextNotification,
  ContextProduct,
  ContextCategory,
  ContextPartner,
  ContextBlog,
} from "./context";
import reducerNotification, {
  initStateNotification,
} from "./reducerNotification";
import reducerProduct, { stateInitProduct } from "./reducerProduct";
import reducerCategory, { initStateCategory } from "./reducerCategory";
import logger from "./logger";
import reducerPartner, { initStatePartner } from "./reducerPartner";
import reducerBlog, { stateInitBlog } from "./reducerBlog";
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

  const [statePartner, dispatchPartner] = useReducer(
    logger(reducerPartner),
    initStatePartner
  );

  const [stateBlog, dispatchBlog] = useReducer(
    logger(reducerBlog),
    stateInitBlog
  );

  return (
    <ContextNotification.Provider
      value={[stateNotification, dispatchNotification]}
    >
      <ContextCategory.Provider value={[stateCategory, dispatchCategory]}>
        <ContextBlog.Provider value={[stateBlog, dispatchBlog]}>
          <ContextPartner.Provider value={[statePartner, dispatchPartner]}>
            <ContextProduct.Provider value={[stateProduct, dispatchProduct]}>
              <MainRouter />
            </ContextProduct.Provider>
          </ContextPartner.Provider>
        </ContextBlog.Provider>
      </ContextCategory.Provider>
    </ContextNotification.Provider>
  );
};

export default AppProvider;
