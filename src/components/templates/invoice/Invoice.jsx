import React from 'react';
import { InvoiceHalf } from './InvoiceHalf';

export const Invoice = ({ data }) => {
  return (
    <div>
      <InvoiceHalf data={data} />
      <div className='separator'>
        ---------------------------------------------------------------------------------------------------------------------------------------------------------
      </div>
      <InvoiceHalf data={data} />
    </div>
  );
};
