import { types } from '../types/types';

const initialState = {
  products: [],
  productsForSale: [],
  activeProduct: null,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.productLoaded:
      return {
        ...state,
        products: [...action.payload],
      };

    case types.clearProductsLoaded:
      return {
        ...state,
        products: [],
      };

    case types.productSetActive:
      return {
        ...state,
        activeProduct: {
          ...action.payload,
        },
      };

    case types.productClearActivePoduct:
      return {
        ...state,
        activeProduct: null,
      };

    case types.productAddedForSale:
      return {
        ...state,
        productsForSale: [...state.productsForSale, action.payload],
      };

    case types.productSetProductsForSale:
      return {
        ...state,
        productsForSale: action.payload,
      };

    default:
      return state;
  }
};
