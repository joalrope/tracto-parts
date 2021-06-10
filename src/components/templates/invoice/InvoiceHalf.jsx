import React from 'react';
// import { useSelector } from 'react-redux';
//import moment from 'moment';
import { InvoiceHeader } from './InvoiceHeader';
import { InvoiceFooter } from './InvoiceFooter';
import { InvoiceBody } from './InvoiceBody';
import './invoice.scss';

export const InvoiceHalf = ({ data }) => {
  const { transactionData, activeCustomer, productsForSale, totals } = data;
  let clonedProducts = JSON.parse(JSON.stringify(productsForSale));
  let clonedCustomer = JSON.parse(JSON.stringify(activeCustomer));
  let i = 0;

  const products = clonedProducts.map((product) => {
    i++;
    return {
      id: product.id,
      item: `0${i}`,
      code: product.code,
      title: product.title,
      qty: product.qty,
      salePrice: product.salePrice,
      total: product.total,
    };
  });

  if (products.length < 11) {
    i = products.length;
    while (i < 9) {
      i++;
      products[i] = {
        id: i,
        item: i < 10 ? `0${i}` : `${i}`,
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
      <InvoiceHeader customer={clonedCustomer} transaction={transactionData} />
      <InvoiceBody products={products} />
      <InvoiceFooter totals={totals} />
    </div>
  );
};
