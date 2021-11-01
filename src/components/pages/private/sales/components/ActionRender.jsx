import React from 'react';
import { useDispatch } from 'react-redux';
import { Popconfirm } from 'antd';
import { CloseSquareOutlined } from '@ant-design/icons';
import { setProductsForSale } from '../../../../../actions/products';
import { deleteItemProdForSale } from '../../../../../helpers/sales/sales-utils';

export const ActionRender = (record) => {
  const dispatch = useDispatch();
  const handleDelete = (id, trademark) => {
    const newProducts = deleteItemProdForSale(id, trademark);
    dispatch(setProductsForSale(newProducts));
  };
  return (
    <div className='action-button__column'>
      <Popconfirm
        title={`¿Seguro desea eliminar ${record.code}?`}
        onConfirm={() => handleDelete(record.id, record.trademark)}
        okText='Si'
        cancelText='No'
        placement='topRight'
      >
        <CloseSquareOutlined className='--action-icon__remove' />
      </Popconfirm>
    </div>
  );
};
