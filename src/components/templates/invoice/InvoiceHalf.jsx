import React from 'react';
import PropTypes from 'prop-types';
// import { useSelector } from 'react-redux';
//import moment from 'moment';
import { InvoiceHeader } from './InvoiceHeader';
import { InvoiceFooter } from './InvoiceFooter';
import { InvoiceBody } from './InvoiceBody';
import './invoice.scss';

export const InvoiceHalf = ({ data }) => {
  const { billingData, activeCustomer, productsForSale, totals } = data;
  let clonedProducts = JSON.parse(JSON.stringify(productsForSale));
  let customer = JSON.parse(JSON.stringify(activeCustomer));
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
      <InvoiceHeader customer={customer} billing={billingData} />
      <InvoiceBody products={products} />
      <InvoiceFooter totals={totals} />
    </div>
  );
};

InvoiceHalf.propTypes = {
  data: PropTypes.object,
};
