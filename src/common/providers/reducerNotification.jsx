import { SET_NOTIFICATION_ADD, SET_NOTIFICATION_DELETE } from "./constants";

const initStateNotification = {
  notification: {
    addProduct: false,
    deleteProduct: false,
  },
};

const reducerNotification = (state, action) => {
  switch (action.type) {
    case SET_NOTIFICATION_ADD:
      return {
        ...state,
        notification: {
          ...state.notification,
          addProduct: action.payload,
        },
      };
    case SET_NOTIFICATION_DELETE:
      return {
        ...state,
        notification: {
          ...state.notification,
          deleteProduct: action.payload,
        },
      };
    default:
      return state;
  }
};
export { initStateNotification };
export default reducerNotification;
