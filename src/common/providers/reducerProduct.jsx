import { CREATE_PRODUCT, GET_PRODUCTS } from "./constants";

const stateInitProduct = {
  products: [],
};

const reducerProduct = (state, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case CREATE_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    default:
  }
};

export { stateInitProduct };
export default reducerProduct;
