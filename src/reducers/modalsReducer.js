import { types } from '../types/types';

const initialState = {
  displayInvoicePdf: false,
  displayFormCustomerAdd: false,
  productForm: { show: false, mode: '' },
};

export const modalsReducer = (state = initialState, action) => {
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

    case types.modalsProductForm:
      return {
        ...state,
        productForm: { ...action.payload },
      };

    default:
      return state;
  }
};
