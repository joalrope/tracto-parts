import React from 'react';
import { CustomerForm } from './CustomerForm/CustomerForm';
import { ProductForm } from './ProductForm/ProductForm';
import { TrademarkForm } from './TrademarkForm/TrademarkForm';
import './all-forms.scss';

export const AllForms = () => {
  return (
    <div className='--all-forms__container'>
      <CustomerForm />
      <ProductForm />
      <TrademarkForm />
    </div>
  );
};

export const alignItemsRight = { textAlign: 'right' };
export const alignItemsCenter = { textAlign: 'center' };

export const formatterNumber = (val) => {
  if (!val) return 0;
  return `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.').replace(/\.(?=\d{0,2}$)/g, ',');
};

export const parserNumber = (val) => {
  if (!val) return 0;
  return Number.parseFloat(val.replace(/\$\s?|(\.*)/g, '').replace(/(,{1})/g, '.')).toFixed(2);
};
