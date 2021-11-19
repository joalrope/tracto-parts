import { types } from '../types/types';

const initialState = {
  products: [],
  productsForSale: [],
  productsEntrance: [{ code: '', trademark: 'CTP', location: '', qty: 1, costPrice: 0 }],
  activeProduct: null,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.productLoaded:
      return {
        ...state,
        products: [...action.payload],
      };

    case types.productclearProductsLoaded:
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

    case types.productAddProductForSale:
      return {
        ...state,
        productsForSale: [...state.productsForSale, action.payload],
      };

    case types.productSetProductsForSale:
      return {
        ...state,
        productsForSale: action.payload,
      };

    case types.productClearProductsForSale:
      return {
        ...state,
        productsForSale: [],
      };

    case types.productAddProductForEntrance:
      return {
        ...state,
        productsEntrance: [...state.productsEntrance, action.payload],
      };

    case types.productSetProductsEntrance:
      return {
        ...state,
        productsEntrance: action.payload,
      };

    case types.productClearProductsEntrance:
      return {
        ...state,
        productsEntrance: initialState.productsEntrance,
      };

    default:
      return state;
  }
};
