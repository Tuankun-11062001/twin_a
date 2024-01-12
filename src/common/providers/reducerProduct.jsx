import { ON_CHANGE_PRODUCT } from "./constants";

const stateInitProduct = {
  dataProduct: [],
  product: {
    publish: "",
    code: "",
    title: "",
    currentImage: "",
    image: [],
    category: "",
    partner: "",
    price: 0,
    views: 0,
    profit: 0,
    buy: 0,
    description: "",
  },
};

const reducerProduct = (state, action) => {
  switch (action.type) {
    case ON_CHANGE_PRODUCT:
      return {
        ...state,
      };
    default:
  }
};

export { stateInitProduct };
export default reducerProduct;
