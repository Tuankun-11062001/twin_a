import { CREATE_PARTNER, DELETE_PARTNER, GET_PARTNERS } from "./constants";

const initStatePartner = {
  partners: [],
};

const reducerPartner = (state, action) => {
  switch (action.type) {
    case GET_PARTNERS:
      return {
        ...state,
        partners: action.payload,
      };
    case CREATE_PARTNER:
      return {
        ...state,
        partners: [...state.partners, action.payload],
      };
    case DELETE_PARTNER:
      return {
        ...state,
        partners: action.payload,
      };
    default:
      return state;
  }
};

export { initStatePartner };

export default reducerPartner;
