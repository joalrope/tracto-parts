import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Space, Tooltip } from 'antd';
import { CloseSquareOutlined } from '@ant-design/icons';
import { deleteItemProdForSale } from '../../../../helpers/sales/sales-utils';
import { setProductsForSale } from '../../../../actions/products';

export const ActionRender = (record) => {
  const handleDelete = async () => {
    const productsForSale = useSelector((state) => state.product);
    const dispatch = useDispatch();
    /*  const state = store.getState();
      const { productsForSale } = state.product; */

    const products = await deleteItemProdForSale(record.id, productsForSale);

    console.log(products);

    dispatch(setProductsForSale(products));
  };

  return (
    <Space size='small'>
      <Tooltip placement='topLeft' title='Eliminar Producto'>
        <CloseSquareOutlined className='--action-icon__remove' onClick={handleDelete} />
      </Tooltip>
    </Space>
  );
};
