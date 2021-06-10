import React from 'react';
import logo from '../../../assets/images/logo.png';
import './invoice.scss';

export const InvoiceHeader = ({ customer, transaction }) => {
  //TODO: Obtener ownerAddress1 y ownerAddress2 de la base de datos del Propietario
  const ownerAddress1 = 'Zona industrial Los Pinos Manzana 24 Parcela 07 – Estado Bolívar Cod. Postal 8050';
  const ownerAddress2 = 'Telefonos: 0286-9948874/-0414-8664310/0414-8672189 Email- Tractocenter71@gmail.com';

  return (
    <div className='invoice-header'>
      <div className='left-header'>
        <img className='logo' src={logo} alt='' width='120px' />
        <div className='address'>
          <p>{ownerAddress1}</p>
          <p>{ownerAddress2}</p>
        </div>
        <div className='customer-data'>
          <div className='row-customer'>
            <div className='descrip'>Razón Social:</div>
            <div className='to-fill  customer-name'>{customer.name}</div>
          </div>
          <div className='row-customer'>
            <div className='descrip'>Domicilio Fiscal:</div>
            <div className='to-fill'>{customer.address}</div>
          </div>
          <div className='row-customer'>
            <div className='descrip'>Condiciones de pago:</div>
            <div className='to-fill'>{customer.paymentConditions}</div>
          </div>
        </div>
      </div>
      <div className='right-header'>
        <div className='row-info'>
          <div className='descrip-order'>N° O/de compra:</div>
          <div className='to-fill-order'>{transaction.purchaseOrder}</div>
        </div>
        <div className='row-info'>
          <div className='descrip-phones'>Teléfono:</div>
          <div className='to-fill-phones'>{customer.phone}</div>
        </div>
        <div className='row-info'>
          <div className='descrip-rif'>R.I.F.:</div>
          <div className='to-fill-rif'>{customer.code}</div>
        </div>
        <div className='row-info'>
          <div className='descrip-nit'>N.I.T.:</div>
          <div className='to-fill-nit'></div>
        </div>
        <div className='row-info'>
          <div className='descrip-date'>Fecha:</div>
          <div className='to-fill-date'>{transaction.date}</div>
        </div>
        <div className='control-number-frame'>
          <div className='delivery-note'>
            <div className={`delivery-sqr ${transaction.deliveryMode && 'isSelected'}`}></div>
            <div className='delivery-descrip'>Nota de entrega</div>
          </div>
          <div className='quote'>
            <div className={`quote-sqr ${!transaction.deliveryMode && 'isSelected'}`}></div>
            <div className='quote-descrip'>Cotización</div>
          </div>
          <div className='control-number-counter'>
            <div className='centered'>
              <div className='control-number-descrip'>N° DE CONTROL:</div>
              <div className='control-number-code'>{transaction.controlNumber}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
