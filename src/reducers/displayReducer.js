import { types } from '../types/types';

const initialState = {
  displayInvoicePdf: false,
  displayFormCustomerAdd: false,
  displayFormProductAdd: false,
};

export const displayReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.displayGeneratePdf:
      return {
        ...state,
        displayInvoicePdf: action.payload,
      };

    case types.displayFormCustomerAdd:
      return {
        ...state,
        displayFormCustomerAdd: action.payload,
      };

    case types.displayFormProductAdd:
      return {
        ...state,
        displayFormProductAdd: action.payload,
      };

    default:
      return state;
  }
};
