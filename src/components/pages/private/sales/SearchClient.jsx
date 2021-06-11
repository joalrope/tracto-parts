import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListDataFound } from './ListDataFound';
import { useForm } from '../../../../hooks/userForm';
import { clearCustomersLoaded, findCustomerByCode, findCustomerById } from '../../../../actions/customers';
import { displayAddCustomerForm } from '../../../../actions/display';

const columns = [
  ['id', 'id', false],
  ['code', 'RIF', true],
  ['name', 'Nombre', true],
];

export const SearchClient = () => {
  const dispatch = useDispatch();
  const { customers } = useSelector((state) => state.customer);
  const { activeCustomer } = useSelector((state) => state.customer);
  const [formValues, handleInputChange, reset] = useForm({ Code: '' });
  const { Code } = formValues;

  const handleClick = (rowData) => {
    const { id, code, name } = JSON.parse(JSON.stringify(rowData));

    if (id === 0 && code === '' && name === 'Agregar') {
      dispatch(displayAddCustomerForm(true));
      return dispatch(clearCustomersLoaded());
    }

    dispatch(findCustomerById(id));
    dispatch(clearCustomersLoaded());
    reset();
  };

  const handleOnKeyPress = (e) => {
    if (e.key === 'Enter') {
      dispatch(findCustomerByCode(Code));

      if (customers[0]) {
        const { id } = customers[0];
        if (id) {
          dispatch(findCustomerById(id));
          if (activeCustomer) reset();
        }
      }
    }
  };

  useEffect(() => {
    dispatch(findCustomerByCode(Code.toUpperCase()));
  }, [dispatch, Code]);

  return (
    <div className='search-group'>
      <h5 className='search-title'>Cliente</h5>
      <div className='input-group form-group search-input'>
        <div className='input-group-prepend'>
          <span className='input-group-text input-span-text'>RIF ó Nombre</span>
        </div>
        <input
          type='text'
          className='form-control'
          placeholder='RIF ó Nombre'
          name='Code'
          autoComplete='off'
          value={Code}
          onChange={handleInputChange}
          //onFocus={handleInputFocus}
          onKeyPress={handleOnKeyPress}
        />
      </div>
      <div className='search-list'>
        {customers.length > 0 && (
          <ListDataFound data={customers} hasHeader={true} columns={columns} handleClick={handleClick} />
        )}
      </div>
    </div>
  );
};
