import React from 'react';
import PropTypes from 'prop-types';
import { InvoiceHalf } from './InvoiceHalf';

export const Invoice = ({ data }) => {
  console.log(data)
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

Invoice.propTypes = {
  data: PropTypes.object,
};
