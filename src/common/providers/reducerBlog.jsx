import { CREATE_BLOG, GET_BLOGS } from "./constants";

const stateInitBlog = {
  blogs: [],
};

const reducerBlog = (state, action) => {
  switch (action.type) {
    case GET_BLOGS:
      return {
        ...state,
        blogs: action.payload,
      };
    case CREATE_BLOG:
      return {
        ...state,
        blogs: [...state.products, action.payload],
      };
    default:
  }
};

export { stateInitBlog };
export default reducerBlog;
