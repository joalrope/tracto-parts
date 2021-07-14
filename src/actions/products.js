import { activeProductTemplate } from '../assets/data/products.dataConfig';
import { fetchWithToken } from '../helpers/fetch';
import { jsonSort } from '../helpers/json-sort';
import { types } from '../types/types';

export const findProductByCode = (code) => {
  return async (dispatch) => {
    try {
      if (code.length > 1) {
        const { ok, result } = await fetchWithToken(`/products/code/${code}`);
        if (ok) {
          dispatch(setProductsLoaded(result));
        }
      } else {
        dispatch(setProductsLoaded([]));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProductByCode = async (code) => {
  try {
    if (code.length > 1) {
      const { ok, result } = await fetchWithToken(`/products/code/${code}`);
      if (ok) {
        const json = await result;
        return JSON.parse(
          JSON.stringify(json).replace(/title/gi, 'label').replace(/code/gi, 'key').replace(/id/gi, 'value')
        );
      }
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
};

export const findProductById = (id) => {
  return async (dispatch) => {
    try {
      const { ok, result } = await fetchWithToken(`/products/${id}`);
      const product = jsonSort(result, activeProductTemplate);

      /*  const urlImage = await getProductImage(product.code, product.details[0].trademark);
      console.log(urlImage); */

      if (ok) {
        dispatch(productSetActive(product));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const productSetActive = (product) => ({
  type: types.productSetActive,
  payload: product,
});

export const productClearActive = () => ({
  type: types.productClearActivePoduct,
});

export const clearProductsLoaded = () => ({
  type: types.productclearProductsLoaded,
});

export const addProductForSale = (product) => ({
  type: types.productAddedForSale,
  payload: product,
});

export const setProductsForSale = (data) => ({
  type: types.productSetProductsForSale,
  payload: data,
});

const setProductsLoaded = (products) => ({
  type: types.productLoaded,
  payload: products,
});
