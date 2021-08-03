import { createBrowserHistory } from 'history';
import { types } from '../types/types';
import { productClearActive, setProductsForSale } from './products';
import { customerClearActive } from './customers';
import { startLogout } from './auth';
import { getUrlBgImage } from '../helpers/getUrlBgImage';

const history = createBrowserHistory();

export const setCurrentPath = (path) => {
  return (dispatch) => {
    if (path === '/logout') {
      path = '/home';
      clearStore(dispatch);
    }
    console.log(getUrlBgImage(path));
    dispatch(setContentBackground(getUrlBgImage(path)));
    history.push(path);
    dispatch(currentPath(path));
  };
};

export const setContentBackground = (path) => {
  return (dispatch) => {
    dispatch(contentBackground(path));
  };
};

const clearStore = (dispatch) => {
  sessionStorage.clear();
  dispatch(setProductsForSale([]));
  dispatch(customerClearActive());
  dispatch(productClearActive());
  dispatch(startLogout());
};

const currentPath = (path) => ({
  type: types.uiSetCurrentPath,
  payload: path,
});

const contentBackground = (urlImage) => ({
  type: types.uiSetContentBackground,
  payload: urlImage,
});
