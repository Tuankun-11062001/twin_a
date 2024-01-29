import { useContext } from "react";
import {
  ContextNotification,
  ContextProduct,
  ContextCategory,
  ContextPartner,
  ContextBlog,
} from "./context";

export const useProviderNotification = () => {
  const [stateNotification, dispatchNotification] =
    useContext(ContextNotification);
  return [stateNotification, dispatchNotification];
};

export const useProviderProduct = () => {
  const [stateProduct, dispatchProduct] = useContext(ContextProduct);
  return [stateProduct, dispatchProduct];
};

export const useProviderCategory = () => {
  const [stateCategory, dispatchCategory] = useContext(ContextCategory);
  return [stateCategory, dispatchCategory];
};

export const useProviderPartner = () => {
  const [statePartner, dispatchPartner] = useContext(ContextPartner);
  return [statePartner, dispatchPartner];
};

export const useProviderBlog = () => {
  const [stateBlog, dispatchBlog] = useContext(ContextBlog);
  return [stateBlog, dispatchBlog];
};
