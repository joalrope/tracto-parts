import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { findProductById, getProductsByCodeRegex } from '../../../../../actions/products';
import { setDisplayAddProductForm } from '../../../../../actions/shows';
import { AsyncDataSelect } from '../../../../ui-component/async-data-select/AsyncDataSelect';
import { NotFoundContentMsg } from '../../../../ui-component/async-data-select/NotFoundContentMsg';

export const SearchProduct = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const products = async (value) => {
    setValue(value);
    return await getProductsByCodeRegex(value);
  };

  const productResult = (id) => {
    dispatch(findProductById(id));
  };

  return (
    <AsyncDataSelect
      placeholder={'Encuentre un Producto'}
      dataSource={products}
      result={productResult}
      notFoundContent={
        <NotFoundContentMsg
          value={value}
          msg={'No existe el producto, Desea agregarlo?'}
          noFoundResult={(value) => {
            dispatch(setDisplayAddProductForm({ show: true, mode: 'add', value }));
          }}
        />
      }
    />
  );
};
