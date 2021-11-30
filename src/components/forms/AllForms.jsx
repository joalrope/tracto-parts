import React from 'react';
import { AddCustomerForm } from './AddCustomerForm/AddCustomerForm';
import { ProductForm } from './ProductForm/ProductForm';
import { TrademarkForm } from './TrademarkForm/TrademarkForm';
import './all-forms.scss';

export const AllForms = () => {
  return (
    <div className='--all-forms__container'>
      <AddCustomerForm />
      <ProductForm />
      <TrademarkForm />
    </div>
  );
};

export const alignItemsRight = { textAlign: 'right' };
export const alignItemsCenter = { textAlign: 'center' };

export const formatterNumber = (val) => {
  if (!val) return 0;
  //return `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.').replace(/\.(?=\d{0,2}$)/g, ',');
  return ` ${val}`.replace(/\./, ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const parserNumber = (val) => {
  if (!val) return 0;
  //return Number.parseFloat(val.replace(/\$\s?|(\.*)/g, '').replace(/(,{1})/g, '.')).toFixed(2);
  return parseFloat(`${val}`.replace(/,/, '#').replace(/\./g, '').replace(/#/, '.'));
};
