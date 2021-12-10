import React from 'react';
import { Modal } from 'antd';
import { increaseQty } from '../controllers/increaseQty';

export const repeatedProductConfirm = (record, productsForSale) => {
  Modal.confirm({
    title: 'Producto repetido',
    content: [
      <>
        <span>{`El Producto ${record.code} ya existe en la venta.`}</span>
        <br />
        <span>{'¿Desea aumentar la cantidad a vender?'}</span>
      </>,
    ],
    autoFocusButton: null,
    okText: 'Si',
    onOk() {
      increaseQty(productsForSale, record);
    },
    cancelText: 'No',
  });
};

export const checkInConfirm = (controlNumber, checkIn) => {
  Modal.confirm({
    title: `Notas de Entregas`,
    content: `¿Desea Generar la nota de entrega ${controlNumber}?`,
    okText: 'Si',
    okType: 'primary',
    cancelText: 'No',
    confirmLoading: true,
    autoFocusButton: null,
    onOk() {
      checkIn();
    },
  });
};
