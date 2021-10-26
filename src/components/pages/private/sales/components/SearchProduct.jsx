import React from 'react';
import { useDispatch } from 'react-redux';
import { findProductById, getProductsByCodeRegex } from '../../../../../actions/products';
import { setDisplayAddProductForm } from '../../../../../actions/shows';
import { AsyncDataSelect } from '../../../../ui-component/async-data-select/AsyncDataSelect';
import { NotFoundContentMsg } from '../../../../ui-component/async-data-select/NotFoundContentMsg';

export const SearchProduct = () => {
  const dispatch = useDispatch();
  const products = async (value) => await getProductsByCodeRegex(value);

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
          msg={'No existe el producto, Desea agregarlo?'}
          noFoundResult={() => {
            dispatch(setDisplayAddProductForm({ show: true, mode: 'add' }));
          }}
        />
      }
    />
  );
};
