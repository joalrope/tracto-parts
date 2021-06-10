import { types } from '../types/types';

const initialState = {
  customers: [],
  activeCustomer: null,
};

export const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.customersLoaded:
      return {
        ...state,
        customers: [...action.payload],
      };

    case types.customerSetActiveCustomer:
      return {
        ...state,
        activeCustomer: {
          ...action.payload,
        },
      };

    case types.customerClearActiveCustomer:
      return {
        ...state,
        activeCustomer: null,
      };

    case types.clearCustomersLoaded:
      return {
        ...state,
        customers: [],
      };

    default:
      return state;
  }
};
