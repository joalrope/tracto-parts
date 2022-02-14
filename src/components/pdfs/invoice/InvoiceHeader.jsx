import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../../assets/images/logo.png';
import './invoice.scss';

export const InvoiceHeader = ({ customer, billing }) => {
  //TODO: Get ownerAddress1 and ownerAddress2 from owner DB
  const ownerAddress1 = 'Zona industrial Los Pinos Manzana 24 Parcela 07 – Estado Bolívar Cod. Postal 8050';
  const ownerAddress2 = 'Telefonos: 0286-9948874/-0414-8664310/0414-8672189 Email- Tractocenter71@gmail.com';

  return (
    <div className='invoice-header'>
      <div className='first-row__header'>
        <div className='logo-side'>
          <img className='logo' src={logo} alt='' width='120px' />
          <div className='address'>
            <p>{ownerAddress1}</p>
            <p>{ownerAddress2}</p>
          </div>
        </div>

        <div className='bill-side'>
          <div className='note-mode__title'>NOTA DE ENTREGA</div>
          <div className='bill-side__date'>
            <div className='descrip-date'>Fecha:</div>
            <div className='to-fill-date'>{billing?.date}</div>
          </div>

          <div className='control-number-counter'>
            <div className='control-number-descrip'>N° DE CONTROL:</div>
            <div className='control-number-code'>{billing?.invoiceNumber}</div>
          </div>
        </div>
      </div>

      <div className='second-row__header'>
        <div className='customer-data'>
          <div className='customer-data__row'>
            <div className='customer-label'>Razón Social:</div>
            <div className='customer-value'>{customer?.name}</div>
            <div className='code-label'>R.I.F:</div>
            <div className='code-value'>{customer?.code}</div>
          </div>
          <div className='customer-data__row'>
            <div className='address-label'>Domicilio Fiscal:</div>
            <div className='address-value'>{customer?.address}</div>
            <div className='phone-label'>Telefonos:</div>
            <div className='phone-value'>{customer?.phone}</div>
          </div>
          <div className='customer-data__row'>
            <div className='paymentConditions-label'>Condiciones de pago:</div>
            <div className='paymentConditions-value'>{customer.paymentConditions}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

InvoiceHeader.propTypes = {
  customer: PropTypes.object,
  billing: PropTypes.object,
};
