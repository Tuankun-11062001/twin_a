import { useContext } from "react";
import {
  ContextNotification,
  ContextProduct,
  ContextCategory,
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
