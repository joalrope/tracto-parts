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
