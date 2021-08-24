import React from 'react';
import { Space, Tooltip } from 'antd';
import { CloseSquareOutlined, EditOutlined } from '@ant-design/icons';
//import { useDispatch } from 'react-redux';
//import { deleteItemProdForSale /* , replaceItemProdForSale  */ } from '../../../../helpers/sales/sales-utils';

export const ForSale = (record) => {
  //const dispatch = useDispatch();

  const handleDeleteBtnClick = (id) => {
    console.log(id);
    //const products = deleteItemProdForSale(id, productsForSale);
    //dispatch(setProductsForSale(products));
  };

  const editProduct = (e) => {
    console.log(e);
  };
  return (
    <div className='action-button_column'>
      <Space size='small'>
        <Tooltip placement='topLeft' title='Eliminar Producto'>
          <CloseSquareOutlined className='--action-icon__remove' onClick={() => handleDeleteBtnClick(record.id)} />
        </Tooltip>
        <Tooltip placement='topLeft' title='Agregar para la venta'>
          <EditOutlined className='--action-icon__edit' onClick={() => editProduct(record)} />
        </Tooltip>
      </Space>
    </div>
  );
};
