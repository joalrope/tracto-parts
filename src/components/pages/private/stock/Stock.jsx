import React from 'react';
import { ProductForm } from '../../../forms/AddProductForm/AddProductForm';
import './stock.scss';

export const Stock = () => {
  return (
    <div className='--stock-page__container'>
      <div className='--product-form__container'>
        <ProductForm />
      </div>
    </div>
  );
};
