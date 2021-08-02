import { createBrowserHistory } from 'history';
import { types } from '../types/types';
import { productClearActive, setProductsForSale } from './products';
import { customerClearActive } from './customers';
import { startLogout } from './auth';

const history = createBrowserHistory();

export const setCurrentPath = (path) => {
  return (dispatch) => {
    if (path === '/logout') {
      path = '/home';
      clearStore(dispatch);
    }

    if (path === '/login') {
      dispatch(setContentBackground('https://cdn.pixabay.com/photo/2017/12/11/20/06/spanner-3013135_960_720.jpg'));
    } else {
      dispatch(setContentBackground(null));
    }
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
