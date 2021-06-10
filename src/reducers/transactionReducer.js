import { types } from '../types/types';

const initialState = {
  transaction: {},
};

export const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.transactionSetTransactionData:
      return {
        ...state,
        transaction: {
          ...action.payload,
        },
      };

    case types.transactionClearTransactionData:
      return {
        ...state,
        transaction: {},
      };

    case types.transactionUpdatePaymentConditions:
      return {
        ...state,
        paymentConditions: action.payload,
      };
    default:
      return state;
  }
};
