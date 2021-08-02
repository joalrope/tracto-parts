import { types } from '../types/types';

const initialState = {
  currentPath: '/app/home',
  contentBackground: null,
};
export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.uiSetContentBackground:
      return {
        ...state,
        contentBackground: action.payload,
      };

    case types.uiSetCurrentPath:
      return {
        ...state,
        currentPath: action.payload,
      };

    default:
      return state;
  }
};
