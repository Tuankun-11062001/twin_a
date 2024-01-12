import {
  CREATE_CATEGORY,
  GET_CATEGORIES,
  ON_CHANGE_PRODUCT,
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

export const onChangeProduct = (payload) => {
  return {
    type: ON_CHANGE_PRODUCT,
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
