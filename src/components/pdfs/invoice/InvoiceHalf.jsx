import React from 'react';
import PropTypes from 'prop-types';
import { InvoiceHeader } from './InvoiceHeader';
import { InvoiceFooter } from './InvoiceFooter';
import { InvoiceBody } from './InvoiceBody';
import './invoice.scss';

export const InvoiceHalf = ({ data }) => {
  const { date, invoiceNumber, customer, items, purchaseTotal, taxes, invoiceTotal, payment } = data;
  let clonedProducts = JSON.parse(JSON.stringify(items));
  const { onCredit, creditDays } = payment;
  const paymentConditions = onCredit ? `Venta a crédito ${creditDays} días` : 'Venta al contado';

  customer['paymentConditions'] = paymentConditions;

  let i = 0;

  const products = clonedProducts.map((product) => {
    i++;
    return {
      id: product.id,
      item: `0${i}`,
      code: product.code,
      trademark: product.trademark,
      title: product.title,
      qty: product.qty,
      salePrice: product.salePrice,
      total: product.totalItem,
    };
  });

  if (products.length < 11) {
    i = products.length;
    while (i < 9) {
      i++;
      products[i] = {
        id: i,
        item: i < 10 ? `0${i}` : `${i}`,
        trademark: '',
        code: '',
        title: '',
        qty: '',
        salePrice: '',
        total: '',
      };
    }
  }

  return (
    <div className='invoice-container'>
      <InvoiceHeader customer={customer} billing={{ date, invoiceNumber }} />
      <InvoiceBody products={products} />
      <InvoiceFooter totals={{ purchaseTotal, ivaTaxAmount: taxes[0].amount, invoiceTotal }} />
    </div>
  );
};

InvoiceHalf.propTypes = {
  data: PropTypes.object,
};
