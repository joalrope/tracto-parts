import { types } from '../types/types';

const initialState = {
  displayInvoicePdf: false,
  displayCustomerFrm: false,
};

export const displayReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.displayGeneratePdf:
      return {
        ...state,
        displayInvoicePdf: action.payload,
      };

    case types.displayAddCustomerForm:
      return {
        ...state,
        displayAddCustomerFrm: action.payload,
      };

    // case types.uiCloseModal:
    //   return {
    //     ...state,
    //     modalOpen: false,
    //   };

    // case types.uiStartLoading:
    //   return {
    //     ...state,
    //     loading: true,
    //   };

    // case types.uiFinishLoading:
    //   return {
    //     ...state,
    //     loading: false,
    //   };

    default:
      return state;
  }
};
