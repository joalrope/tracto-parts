import { types } from '../types/types';

const initialState = {
  billing: {},
};

export const billingReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.billingSetBillingData:
      return {
        ...state,
        billing: {
          ...action.payload,
        },
      };

    case types.billingClearBillingData:
      return {
        ...state,
        billing: {},
      };

    case types.billingUpdatePaymentConditions:
      return {
        ...state,
        paymentConditions: action.payload,
      };
    default:
      return state;
  }
};
