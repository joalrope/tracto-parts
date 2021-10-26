import React from 'react';
import { useDispatch } from 'react-redux';
import { findCustomerById, getCustomerByCode } from '../../../../../actions/customers';
import { setDisplayAddCustomerForm } from '../../../../../actions/shows';
import { AsyncDataSelect } from '../../../../ui-component/async-data-select/AsyncDataSelect';
import { NotFoundContentMsg } from '../../../../ui-component/async-data-select/NotFoundContentMsg';

export const SearchCustomer = () => {
  const dispatch = useDispatch();
  const customers = async (value) => await getCustomerByCode(value);
  const customerResult = (id) => {
    dispatch(findCustomerById(id));
  };

  return (
    <AsyncDataSelect
      placeholder={'Seleccione un Cliente'}
      dataSource={customers}
      result={customerResult}
      notFoundContent={
        <NotFoundContentMsg
          msg={'No existe el cliente, Desea agregarlo?'}
          noFoundResult={() => {
            dispatch(setDisplayAddCustomerForm(true));
          }}
        />
      }
    />
  );
};
