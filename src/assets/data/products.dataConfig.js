import React from 'react';
import { Space, Tooltip } from 'antd';
import { CloseSquareOutlined } from '@ant-design/icons';
import { deleteItemProdForSale } from '../../helpers/sales/sales-utils';
import { setProductsForSale } from '../../actions/products';

import { store } from '../../store/store';

//const auth = ['storer-chief', 'admin', 'owner'];

const productForSaleactionRender = (record) => {
  console.log(record);

  const handleDeleteSelectedProduct = () => {
    const state = store.getState();
    const products = deleteItemProdForSale(record.id, state.product.productsForSale);

    console.log(state.product.productsForSale);

    if (products.length > 0) {
      store.dispatch(setProductsForSale(products));
    }
  };

  return (
    <Space size='small'>
      <Tooltip placement='topLeft' title='Eliminar Producto'>
        <CloseSquareOutlined className='--action-icon__remove' onClick={handleDeleteSelectedProduct} />
      </Tooltip>
    </Space>
  );
};

export const productInfoTemplate = [
  'code',
  'title',
  'trademark',
  'qty',
  'location',
  'salePrice',
  'replacement',
  'measurement',
  'status',
];

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
  { title: 'Marca', dataIndex: 'trademark', key: 'trademark', aling: 'center' },
  { title: 'Cantidad', dataIndex: 'qty', key: 'qty', align: 'right' },
  { title: 'Locación', dataIndex: 'location', key: 'location', align: 'center' },
  {
    title: 'Precio Venta',
    dataIndex: 'salePrice',
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
  { title: 'Cantidad', dataIndex: 'qty', key: 'qty', align: 'right', editable: true },
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
  {
    title: '',
    key: 'action',
    width: 50,
    render: productForSaleactionRender,
  },
];
