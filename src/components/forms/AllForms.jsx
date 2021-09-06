import React from 'react';
import { AddCustomerForm } from './AddCustomerForm/AddCustomerForm';
import { AddProductForm } from './AddProductForm/AddProductForm';
import './all-forms.scss';

export const AllForms = () => {
  return (
    <div className='--all-forms__container'>
      <AddCustomerForm />
      <AddProductForm />
    </div>
  );
};
