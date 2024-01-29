import {
  CREATE_BLOG,
  CREATE_CATEGORY,
  CREATE_PARTNER,
  CREATE_PRODUCT,
  DELETE_BLOG,
  DELETE_CATEGORY,
  DELETE_PARTNER,
  GET_BLOGS,
  GET_CATEGORIES,
  GET_PARTNERS,
  GET_PRODUCTS,
  SET_NOTIFICATION_ADD,
  SET_NOTIFICATION_DELETE,
} from "./constants";

// =================================================================
//                    Action Notifications
//  =================================================================

export const setNotificationAdd = (payload) => {
  return {
    type: SET_NOTIFICATION_ADD,
    payload,
  };
};

export const setNotificationDelete = (payload) => {
  return {
    type: SET_NOTIFICATION_DELETE,
    payload,
  };
};

// =================================================================
//                    Action Product
//  =================================================================

export const getProducts = (payload) => {
  return {
    type: GET_PRODUCTS,
    payload,
  };
};

export const createProduct = (payload) => {
  return {
    type: CREATE_PRODUCT,
    payload,
  };
};

// =================================================================
//                    Action category
//  =================================================================

export const getCategories = (payload) => {
  return {
    type: GET_CATEGORIES,
    payload,
  };
};
export const createCategory = (payload) => {
  return {
    type: CREATE_CATEGORY,
    payload,
  };
};

export const deleteCategory = (payload) => {
  return {
    type: DELETE_CATEGORY,
    payload,
  };
};

// =================================================================
//                    Action partner
//  =================================================================

export const getPartners = (payload) => {
  return {
    type: GET_PARTNERS,
    payload,
  };
};
export const createPartner = (payload) => {
  return {
    type: CREATE_PARTNER,
    payload,
  };
};

export const deletePartner = (payload) => {
  return {
    type: DELETE_PARTNER,
    payload,
  };
};

// =================================================================
//                    Action blog
//  =================================================================

export const getBlogs = (payload) => {
  return {
    type: GET_BLOGS,
    payload,
  };
};
export const createBlog = (payload) => {
  return {
    type: CREATE_BLOG,
    payload,
  };
};

export const deleteBlog = (payload) => {
  return {
    type: DELETE_BLOG,
    payload,
  };
};
