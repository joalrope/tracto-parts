import React from 'react';
import PropTypes from 'prop-types';
import './invoice.scss';

export const InvoiceFooter = ({ totals }) => {
  const { purchaseTotal, ivaTaxAmount, invoiceTotal } = totals;
  const locale = 'es-Es';
  const digits = 2;

  return (
    <div className='invoice-footer'>
      <div className='left-invoice-signature'>
        <div className='row-sign'>
          <div className='descrip-sign'>Entregado (Firma)</div>
          <div className='to-fill-sign'></div>
        </div>
        <div className='row-sign'>
          <div className='descrip-sign'>Nombre y Apellido</div>
          <div className='to-fill-sign'></div>
        </div>
        <div className='row-sign'>
          <div className='descrip-sign'>Cedula:</div>
          <div className='to-fill-sign'></div>
        </div>
      </div>
      <div className='right-invoice-signature'>
        <div className='row-sign'>
          <div className='descrip-sign'>Recibido (Firma)</div>
          <div className='to-fill-sign'></div>
        </div>
        <div className='row-sign'>
          <div className='descrip-sign'>Nombre y Apellido</div>
          <div className='to-fill-sign'></div>
        </div>
        <div className='row-sign'>
          <div className='descrip-sign'>Cedula:</div>
          <div className='to-fill-sign'></div>
        </div>
      </div>
      <div className='invoive-summary'>
        <div className='row-summ'>
          <div className='descrip-summ'>SUB-TOTAL:</div>
          <div className='to-fill-summ'>
            {Number(purchaseTotal).toLocaleString(locale, {
              maximumFractionDigits: Number(digits),
              minimumFractionDigits: Number(digits),
            })}
          </div>
        </div>
        <div className='row-summ'>
          <div className='descrip-summ'>IVA 16% Bs.:</div>
          <div className='to-fill-summ'>
            {Number(ivaTaxAmount).toLocaleString(locale, {
              maximumFractionDigits: Number(digits),
              minimumFractionDigits: Number(digits),
            })}
          </div>
        </div>
        <div className='row-summ'>
          <div className='descrip-summ'>TOTAL GENERAL:</div>
          <div className='to-fill-summ gral-total'>
            {Number(invoiceTotal).toLocaleString(locale, {
              maximumFractionDigits: Number(digits),
              minimumFractionDigits: Number(digits),
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

InvoiceFooter.propTypes = {
  totals: PropTypes.object,
};
