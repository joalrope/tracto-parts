//import { createBrowserHistory } from 'history';
import { types } from '../types/types';
import { productClearActive, setProductsForSale } from './products';
import { customerClearActive } from './customers';
import { startLogout } from './auth';
import { getContentStyles, getUrlBgImage } from '../helpers/getUrlBgImage';
import history from '../helpers/history/history';

//const history = createBrowserHistory();

export const setCurrentPath = (path) => {
  return (dispatch) => {
    if (path === '/logout') {
      path = '/home';
      clearStore(dispatch);
    }
    dispatch(setContentBackgroundImage(getUrlBgImage(path)));
    dispatch(setContentStyles(getContentStyles(path)));
    history.push(path);
    dispatch(currentPath(path));
  };
};

export const setContentBackgroundImage = (path) => {
  return (dispatch) => {
    dispatch(contentBackgroundImage(path));
  };
};

export const setContentStyles = (path) => {
  return (dispatch) => {
    dispatch(contentStyles(path));
  };
};

export const clearStore = (dispatch) => {
  sessionStorage.clear();
  dispatch(setProductsForSale([]));
  dispatch(customerClearActive());
  dispatch(productClearActive());
  dispatch(startLogout());
};

export const loadingStart = () => ({
  type: types.authcheckingStart,
});

export const loadingFinish = () => ({
  type: types.authcheckingFinish,
});

const currentPath = (path) => ({
  type: types.uiSetCurrentPath,
  payload: path,
});

const contentBackgroundImage = (urlImage) => ({
  type: types.uiSetContentBackground,
  payload: urlImage,
});

const contentStyles = (style) => ({
  type: types.uiSetContentStyles,
  payload: style,
});
