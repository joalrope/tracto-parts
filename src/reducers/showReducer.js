import { types } from '../types/types';

const initialState = {
  displayInvoicePdf: false,
  customerForm: { show: false, mode: '', value: '' },
  trademarkForm: { show: false, mode: '', value: '' },
  productForm: { show: false, mode: '', value: '' },
};

export const showReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.displayGeneratePdf:
      return {
        ...state,
        displayInvoicePdf: action.payload,
      };

    case types.displayFormCustomer:
      return {
        ...state,
        customerForm: { ...action.payload },
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
