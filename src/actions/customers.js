import { template } from '../assets/data/customer.dataConfig';
import { fetchWithToken } from '../helpers/fetch';
import { jsonSort } from '../helpers/json-sort';
import { types } from '../types/types';

export const findCustomerByCode = (code) => {
  return async (dispatch) => {
    try {
      if (code.length > 1) {
        const { ok, result } = await fetchWithToken(`/customers/code/${code}`);
        if (ok) {
          dispatch(setCustomersLoaded(result));
        }
      } else {
        dispatch(setCustomersLoaded([]));
      }
    } catch (error) {
      //console.log(error);
    }
  };
};

export const getCustomerByCode = async (code) => {
  try {
    if (code.length > 1) {
      const { ok, result } = await fetchWithToken(`/customers/code/${code}`);
      if (ok) {
        const json = await result;
        return JSON.parse(
          JSON.stringify(json).replace(/name/gi, 'label').replace(/code/gi, 'key').replace(/id/gi, 'value')
        );
      }
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
};

export const findCustomerById = (id) => {
  return async (dispatch) => {
    try {
      const { ok, result } = await fetchWithToken(`/customers/${id}`);

      if (ok) {
        const customer = jsonSort(result, template);
        dispatch(customerSetActive(customer));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const createCustomer = (customer) => {
  return async (dispatch) => {
    try {
      const resultCustomer = await fetchWithToken('/customers/', customer, 'POST');
      //const resultCustomer = await resp.json();

      const { ok, msg, result } = resultCustomer;
      if (ok) {
        const customer = jsonSort(result, template);
        dispatch(customerSetActive(customer));
      } else {
        console.log(msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const customerSetActive = (customer) => ({
  type: types.customerSetActiveCustomer,
  payload: customer,
});

export const customerClearActive = () => ({
  type: types.customerClearActiveCustomer,
});

const setCustomersLoaded = (customers) => ({
  type: types.customersLoaded,
  payload: customers,
});

export const clearCustomersLoaded = () => ({
  type: types.clearCustomersLoaded,
});

export const addCustomerForSale = (customer) => ({
  type: types.customerAddedForSale,
  payload: customer,
});

export const setCustomersForSale = (data) => ({
  type: types.customerSetCustomersForSale,
  payload: data,
});
