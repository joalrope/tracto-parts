import { activeProductTemplate, productTemplate } from '../assets/data/products.dataConfig';
import { fetchWithToken } from '../helpers/fetch';
import { jsonSort } from '../helpers/json-sort';
import { types } from '../types/types';

export const getProducts = async (page, pageSize) => {
  const { ok, result } = await fetchWithToken(`/products/page/${page}/size/${pageSize}`);
  if (ok) {
    return result;
  }
};

export const findProductByCode = (code) => {
  return async (dispatch) => {
    try {
      if (code.length > 1) {
        const { ok, result } = await fetchWithToken(`/products/regex/${code}`);
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
    const prod = await fetchWithToken(`/products/code/${code}`);

    const product = await prod;
    return product;
  } catch (error) {
    console.log(error);
  }
};

export const getProductsByCodeRegex = async (code) => {
  try {
    if (code.length > 1) {
      const { ok, result } = await fetchWithToken(`/products/regex/${code}`);
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

export const updateProductQty = async (product) => {
  const { code } = product;
  try {
    await fetchWithToken(`/products/qty/${code}`, product, 'PUT');
  } catch (error) {
    console.log(error);
  }
};

export const getProductLocation = async (code, trademark) => {
  try {
    const { ok, result } = await fetchWithToken(`/products/location/code/${code}/trademark/${trademark}`);
    if (ok) {
      return result;
    }
    return [];
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (id, product) => {
  try {
    await fetchWithToken(`/products/${id}`, product, 'PUT');
  } catch (error) {
    console.log(error);
  }
};

export const findProductById = (id) => {
  return async (dispatch) => {
    try {
      const { ok, result } = await fetchWithToken(`/products/${id}`);
      const product = jsonSort(result, activeProductTemplate);

      if (ok) {
        dispatch(productSetActive(product));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const createProduct = (product) => {
  return async (dispatch) => {
    try {
      const resultProduct = await fetchWithToken('/products', product, 'POST');

      const { ok, msg, result } = resultProduct;
      if (ok) {
        const product = jsonSort(result, productTemplate);
        dispatch(productSetActive(product));
      } else {
        console.log(msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteProduct = async (id) => {
  try {
    const { ok, result } = await fetchWithToken(`/products/${id}`, {}, 'DELETE');

    if (ok) {
      console.log(result);
    }
  } catch (error) {
    console.log(error);
  }
};

export const saveNewStockEntrance = (products) => {
  console.log(products);
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
  type: types.productAddProductForSale,
  payload: product,
});

export const clearProductsForSale = () => ({
  type: types.productClearProductsForSale,
});

export const setProductsForSale = (products) => ({
  type: types.productSetProductsForSale,
  payload: products,
});

const setProductsLoaded = (products) => ({
  type: types.productLoaded,
  payload: products,
});

export const addProductForEntrance = (product) => ({
  type: types.productAddProductForEntrance,
  payload: product,
});

export const setProductsEntrance = (products) => ({
  type: types.productSetProductsEntrance,
  payload: products,
});

export const clearProductsEntrance = () => ({
  type: types.productClearProductsEntrance,
});
