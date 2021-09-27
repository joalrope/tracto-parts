import { types } from '../types/types';

const initialState = {
  loading: false,
  currentPath: '/home',
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

    case types.uiStartLoading:
      return {
        ...state,
        loading: true,
      };

    case types.uiFinishLoading:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
