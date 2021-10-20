import { types } from '../types/types';

const initialState = {
  displayInvoicePdf: false,
  displayFormCustomer: false,
  trademarkForm: { show: false, mode: '' },
  productForm: { show: false, mode: '' },
};

export const modalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.displayGeneratePdf:
      return {
        ...state,
        displayInvoicePdf: action.payload,
      };

    case types.displayFormCustomer:
      return {
        ...state,
        displayFormCustomer: action.payload,
      };

    case types.displayFormTrademark:
      return {
        ...state,
        trademarkForm: { ...action.payload },
      };

    case types.displayFormProduct:
      return {
        ...state,
        productForm: { ...action.payload },
      };

    default:
      return state;
  }
};
