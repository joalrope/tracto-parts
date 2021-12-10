import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getBillingInfo } from '../../pages/private/sales/controllers/getBillingInfo';
import { GeneratePdfFromHtml } from '../../wrappers/GeneratePdfFromHtml';
import { msgWhenUnmounting } from './controllers/msgWhenUnmounting';
import { pdfInfo } from './controllers/pdfInfo';
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

export const InvoicePdf = () => {
  const { displayInvoicePdf } = useSelector((state) => state.show);
  const [ivaTax, setIvaTax] = useState(0);
  const [invoiceNumber, setInvoiceNumber] = useState('');

  useEffect(async () => {
    const abortController = new AbortController();
    const billingInfo = await getBillingInfo();
    if (billingInfo) {
      const { controlNumber, ivaTax } = billingInfo;
      setIvaTax(ivaTax);
      setInvoiceNumber(controlNumber);
    }
    return () => {
      abortController.abort();
    };
  }, []);

  const data = pdfInfo(invoiceNumber, ivaTax);

  return (
    <div>
      {displayInvoicePdf && (
        <GeneratePdfFromHtml
          WrappedComponent={Invoice}
          data={data}
          msgWhenUnmounting={() => msgWhenUnmounting(invoiceNumber)}
        />
      )}
    </div>
  );
};

Invoice.propTypes = {
  data: PropTypes.object,
};
