import { types } from '../types/types';

const initialState = {
  trademarks: [],
  titles: [],
};

export const trademarkReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.trademarksLoaded:
      return {
        ...state,
        trademarks: [...action.payload],
      };

    case types.clearTrademarksLoaded:
      return {
        ...state,
        trademarks: [],
      };

    case types.trademarksTitles:
      return {
        ...state,
        titles: [...action.payload],
      };

    case types.trademarksAddNew:
      return {
        ...state,
        titles: [...state.titles, action.payload],
      };

    default:
      return state;
  }
};
