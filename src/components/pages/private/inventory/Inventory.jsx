import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findCustomerById, getCustomerByCode } from '../../../../actions/customers';
import { findProductById, getProductByCode } from '../../../../actions/products';
import { AsyncDataSelect } from '../../../ui-component/async-data-select/AsyncDataSelect';

export const Inventory = () => {
  const dispatch = useDispatch();
  const { activeCustomer } = useSelector((state) => state.customer);
  const { activeProduct } = useSelector((state) => state.product);
  const customers = async (value) => await getCustomerByCode(value);
  const products = async (value) => await getProductByCode(value);
  console.log(customers);

  const result = (id) => {
    dispatch(findCustomerById(id));
    dispatch(findProductById(id));
  };

  const noDataFounded = (msg) => {
    console.log(msg);
  };

  return (
    <div>
      <h2>Inventario</h2>
      <div className='--search-data__container'>
        <AsyncDataSelect
          placeholder={'Seleccione un Cliente'}
          style={{ width: '200px' }}
          dataSource={customers}
          result={result}
          notFoundAsyncData={noDataFounded}
        />

        <AsyncDataSelect
          placeholder={'Encuentre un Producto'}
          style={{ width: '200px', marginTop: '10px' }}
          dataSource={products}
          result={result}
        />
      </div>
      {<p>{activeProduct && JSON.stringify(activeProduct)}</p>}
      <br />
      {<p>{activeCustomer && JSON.stringify(activeCustomer)}</p>}
    </div>
  );
};
