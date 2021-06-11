import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { displayAddCustomerForm } from '../../actions/display';
import { Input } from '../controls/Input/Input';
import './add-customer.scss';

export const AddCustomerForm = ({ result }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      type: '',
      name: '',
      code: '',
      address: '',
      phones: '',
      email: '',
      credit: '',
      limit: '',
    },
    onSubmit: () => {},
  });

  const onClickOk = (e) => {
    console.log(e.target.value);
    result({ ok: true, data: formik.values });
    dispatch(displayAddCustomerForm(false));
  };
  const onClickCancel = () => {
    dispatch(displayAddCustomerForm(false));
  };
  return (
    <form>
      <div className='--rows'>
        <Input
          title={'V/J'}
          type={'checkbox'}
          name={'type'}
          onChange={formik.handleChange}
          value={formik.values.type}
        />
        <Input title={'RIF o Cedula'} name={'code'} onChange={formik.handleChange} value={formik.values.code} />
        <Input title={'Nombre'} name={'name'} onChange={formik.handleChange} value={formik.values.name} />
      </div>
      <div className='--rows'>
        <Input title={'Direccion'} name={'address'} onChange={formik.handleChange} value={formik.values.address} />
      </div>

      <div className='--rows'>
        <Input title={'Teléfonos'} name={'phones'} onChange={formik.handleChange} value={formik.values.phones} />
        <Input title={'Correo'} name={'email'} onChange={formik.handleChange} value={formik.values.email} />
        <Input
          title={'¿Tendrá crédito?:'}
          type={'checkbox'}
          name={'credit'}
          onChange={formik.handleChange}
          value={formik.values.credit}
        />
        {formik.values.credit === true && (
          <Input title={'Limite'} name={'limit'} onChange={formik.handleChange} value={formik.values.limit} />
        )}
      </div>
      {formik.values.code && formik.values.code.charAt(0) !== 'V' && <h4>CONTACTO</h4>}
      <div className='--buttons'>
        <button onClick={onClickOk}>Aceptar</button>
        <button onClick={onClickCancel}>Cancelar</button>
      </div>
    </form>
  );
};

AddCustomerForm.propTypes = {
  result: PropTypes.func,
};
