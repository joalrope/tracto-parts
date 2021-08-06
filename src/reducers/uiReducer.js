import { types } from '../types/types';

const initialState = {
  currentPath: '/app/home',
  contentStyles: null,
  contentBackgroundImage: null,
};
export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.uiSetContentBackground:
      return {
        ...state,
        contentBackgroundImage: action.payload,
      };

    case types.uiSetContentStyles:
      return {
        ...state,
        contentStyles: action.payload,
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
