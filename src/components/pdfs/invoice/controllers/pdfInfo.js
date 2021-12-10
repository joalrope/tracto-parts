import moment from 'moment';
import { store } from '../../../../store/store';

export const pdfInfo = (controlNumber, ivaTax) => {
  const state = store.getState();
  const { productsForSale } = state.product;
  const { activeCustomer } = state.customer;

  const getBillingData = () => ({
    date: moment().format('DD/MM/YYYY'),
    controlNumber,
    ivaTax,
    deliveryMode: true,
    purchaseOrder: '',
  });

  const purchase = () => {
    return productsForSale.reduce((grandTotal, { totalItem }) => Number(grandTotal) + Number(totalItem), 0);
  };

  const purchaseTotal = purchase();
  const ivaTaxAmount = (purchaseTotal * ivaTax) / 100;
  const invoiceTotal = purchaseTotal + ivaTaxAmount;

  const totals = () => ({
    purchaseTotal,
    ivaTaxAmount,
    invoiceTotal,
  });

  return { billingData: getBillingData(), activeCustomer, productsForSale, totals: totals() };
};
