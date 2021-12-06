import React from 'react';
import { Tooltip } from 'antd';

// import { ActionRender } from '../../components/ui-component/product/for-sale/ActionRender';

export const productTemplate = ['id', 'code', 'title', 'category', 'details', 'replacement', 'measurement', 'status'];

export const activeProductTemplate = [
  'id',
  'code',
  'title',
  'category',
  'details',
  'replacement',
  'measurement',
  'status',
];

export const columns = [
  { title: 'Código', dataIndex: 'code', key: 'code', aling: 'center' },
  { title: 'Descripción', dataIndex: 'title', key: 'title' },
  { title: 'Marca', dataIndex: ['details', 'trademark'], key: 'trademark', aling: 'center' },
  {
    title: 'Cantidad',
    dataIndex: ['details', 'qty'],
    key: 'qty',
    align: 'right',
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
  { title: 'Locación', dataIndex: 'location', key: 'location', align: 'center' },
  {
    title: 'Precio Venta',
    dataIndex: ['details', 'salePrice'],
    key: 'salePrice',
    align: 'right',
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
  { title: 'Equivalencias', dataIndex: 'replacement', key: 'replacement' },
  { title: 'Medidas', dataIndex: 'measurement', key: 'measurement' },
  { title: 'Condición', dataIndex: 'status', key: 'status' },
];

export const forSaleColumns = [
  { title: 'Item', dataIndex: 'key', key: 'key', aling: 'center' },
  { title: 'Código', dataIndex: 'code', key: 'code', aling: 'center' },
  { title: 'Descripción', dataIndex: 'title', key: 'title' },
  { title: 'Marca', dataIndex: 'trademark', key: 'trademark', aling: 'center' },
  {
    title: 'Cantidad',
    dataIndex: 'qty',
    key: 'qty',
    align: 'right',
    editable: true,
    render: /*eslint-disable-line*/ (value) => {
      return (
        <span style={{ maxWidth: '100px' }}>
          {Number(value).toLocaleString('es-CO', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })}
        </span>
      );
    },
  },
  {
    title: 'Precio Venta',
    dataIndex: 'salePrice',
    key: 'salePrice',
    align: 'right',
    editable: true,
    render: /*eslint-disable-line*/ (value) => {
      return (
        <span style={{ maxWidth: '100px' }}>
          {Number(value).toLocaleString('es-CO', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })}
        </span>
      );
    },
  },
  {
    title: 'Total Item',
    dataIndex: 'totalItem',
    key: 'totalItem',
    align: 'right',
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
];

export const gralColumns = [
  {
    title: 'key',
    dataIndex: 'key',
    key: 'key',
    aling: 'center',
    width: 0,
  },
  {
    title: 'Código',
    dataIndex: 'code',
    key: 'code',
    aling: 'center',
    width: 50,
    ellipsis: {
      showTitle: false,
    },
    render: /*eslint-disable-line*/ (value) => <p>{String(value.toUpperCase())}</p>,
  },
  {
    title: 'Descripción',
    dataIndex: 'title',
    key: 'title',
    width: 120,
    ellipsis: true,

    render: /*eslint-disable-line*/ (value) => (
      <Tooltip style={{ color: 'yellow' }} placement='topLeft' title={value}>
        {value}
      </Tooltip>
    ),
  },
  {
    title: 'Detalles',
    dataIndex: 'details',
    key: 'details',
    children: [
      {
        title: 'Marca',
        dataIndex: ['details', 0, 'trademark'],
        key: 'trademark',
        aling: 'center',
        width: 50,
        ellipsis: {
          showTitle: false,
        },
      },
      {
        title: 'Precio Venta',
        dataIndex: ['details', 0, 'salePrice'],
        key: 'salePrice',
        align: 'right',
        width: 70,
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
        title: 'stock',
        dataIndex: ['details', 0, 'stock'],
        key: 'stock',
        children: [
          {
            title: 'Cantidad',
            dataIndex: ['details', 0, 'stock', 0, 'qty'],
            key: 'qty',
            align: 'right',
            width: 60,
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
            title: 'Locación',
            dataIndex: ['details', 0, 'stock', 0, 'location'],
            key: 'location',
            align: 'center',
            width: 70,
            ellipsis: {
              showTitle: false,
            },
          },
        ],
        aling: 'center',
        width: 10,
        ellipsis: {
          showTitle: false,
        },
      },
    ],
    width: 30,
    ellipsis: {
      showTitle: false,
    },
  },
  {
    title: 'Equivalencias',
    dataIndex: 'replacement',
    key: 'replacement',
    width: 100,
    ellipsis: {
      showTitle: true,
    },
    render: /*eslint-disable-line*/ (value) => {
      return value.map((item, index) => (
        <>
          <div key={item} style={{ margin: 0, padding: 0 }}>
            {index + 1}.- {item}
          </div>
          {/*index < value.length - 1 && <span>{`;  `}</span>*/}
        </>
      ));
    },
  },
];
