import { CREATE_CATEGORY, GET_CATEGORIES, DELETE_CATEGORY } from "./constants";

const initStateCategory = {
  categories: [],
};

const reducerCategory = (state, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case CREATE_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
};

export { initStateCategory };

export default reducerCategory;
