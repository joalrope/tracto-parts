import { Tooltip } from 'antd';
import React from 'react';
//import { Tooltip } from 'antd';

export const saleTemplate = ['invoiceNumber', 'date', 'coin', 'customer', 'items', 'taxes', 'invoiceTotal', 'payment'];

export const Columns = [
  {
    title: 'Número',
    dataIndex: 'invoiceNumber',
    key: 'invoiceNumber',
    aling: 'center',
    width: 20,
    ellipsis: {
      showTitle: false,
    },
  },
  {
    title: 'Fecha',
    dataIndex: 'date',
    key: 'date',
    width: 20,
    ellipsis: true,

    /* render: /*eslint-disable-line (title) => (
      <Tooltip style={{ color: 'yellow' }} placement='topLeft' title={title}>
        {title}
      </Tooltip>
    ), */
  },
  {
    title: 'Comprador',
    dataIndex: 'customer',
    key: 'customer',
    width: 80,
    ellipsis: true,
    render: /*eslint-disable-line*/ (customer) => (
      <Tooltip style={{ color: 'yellow' }} placement='topLeft' title={customer.name}>
        {customer.name}
      </Tooltip>
    ),
  },
  {
    title: 'Monto Total',
    dataIndex: 'invoiceTotal',
    key: 'invoiceTotal',
    align: 'right',
    width: 30,
    ellipsis: true,
    render: /*eslint-disable-line*/ (value) => {
      return (
        <span>
          {Number(value).toLocaleString('es-CO', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })}
        </span>
      );
    },
  },
  {
    title: 'Pagada',
    dataIndex: 'payment',
    key: 'payment',
    width: 20,
    ellipsis: {
      showTitle: true,
    },
    render: /*eslint-disable-line*/ (payment) => (
      <div style={{ textAlign: 'center' }}>{payment.isPaid ? 'Si' : 'No'}</div>
    ),
  },
];
