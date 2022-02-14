import { fetchWithToken } from '../helpers/fetch';
import { types } from '../types/types';

export const getNextNumberBilling = () => {
  return async () => {
    await fetchWithToken('/invoices/lastInvoice');
  };
};

export const SetBilling = (data) => ({
  type: types.billingSetBillingData,
  payload: data,
});

export const ClearBilling = () => ({
  type: types.billingClearBillingData,
});

export const UpdatePaymentConditions = (paymentConditions) => ({
  type: types.billingUpdatePaymentConditions,
  payload: paymentConditions,
});
