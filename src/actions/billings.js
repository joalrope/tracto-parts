import { fetchWithToken } from '../helpers/fetch';
import { types } from '../types/types';

export const getNextNumberBilling = () => {
  return async () => {
    await fetchWithToken('/invoices/lastInvoice');
  };
};

export const SetBilling = (data) => ({
  type: types.invoiceSetBillingData,
  payload: data,
});

export const ClearBilling = () => ({
  type: types.invoiceClearBillingData,
});

export const UpdatePaymentConditions = (paymentConditions) => ({
  type: types.invoiceUpdatePaymentConditions,
  payload: paymentConditions,
});
