import React from 'react';
import { AddCustomerForm } from './AddCustomerForm/AddCustomerForm';
import { ProductForm } from './ProductForm/ProductForm';
import './all-forms.scss';

export const AllForms = () => {
  return (
    <div className='--all-forms__container'>
      <AddCustomerForm />
      <ProductForm />
    </div>
  );
};
