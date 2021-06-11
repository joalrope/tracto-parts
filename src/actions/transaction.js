import { fetchWithToken } from '../helpers/fetch';
import { types } from '../types/types';

export const getNextNumberTransaction = () => {
  return async () => {
    await fetchWithToken('/invoices/lastInvoice');
  };
};

export const SetTransaction = (data) => ({
  type: types.invoiceSetTransactionData,
  payload: data,
});

export const ClearTransaction = () => ({
  type: types.invoiceClearTransactionData,
});

export const UpdatePaymentConditions = (paymentConditions) => ({
  type: types.invoiceUpdatePaymentConditions,
  payload: paymentConditions,
});
