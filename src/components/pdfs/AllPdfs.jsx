import React from 'react';
import { useSelector } from 'react-redux';
import { InvoicePdf } from './invoice/Invoice';

export const AllPdfs = () => {
  const { displayInvoicePdf } = useSelector((state) => state.show);

  return <div>{displayInvoicePdf && <InvoicePdf />}</div>;
};
