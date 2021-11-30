import React, { useRef } from 'react';
import PropTypes from 'prop-types';
//import { useDispatch } from 'react-redux';
import { Input, Form /* , Modal */ } from 'antd';
//import { getProductByCode } from '../../../actions/products';
//import { setDisplayAddProductForm } from '../../../actions/shows';

export const InputCode = ({ index = -1, withResult = false, onPressEnter }) => {
  //const dispatch = useDispatch();
  const ref = useRef(null);
  const onDownEnter = async (e) => {
    const code = e.target.value;
    //let ok;
    /*  if (code?.length > 2) {
      ({ ok } = await getProductByCode(code));
    } */

    /* if (!ok && code?.length > 2) {
      return Modal.confirm({
        title: 'Disponibilidad',
        content: [`El código ${code} no existe`, `¿Desea crearlo?`],
        autoFocusButton: null,
        okText: 'Si',
        cancelText: 'No',
        onOk() {
          dispatch(setDisplayAddProductForm({ show: true, mode: 'add' }));
        },
        onCancel() {},
      });
    } */
    if (withResult) {
      onPressEnter(code);
    }
  };

  return (
    <Form.Item
      name={index !== -1 ? [index, 'code'] : 'code'}
      label={'Código'}
      help='Introduzca el código'
      rules={[
        {
          required: true,
          message: 'Ingrese el código del producto!',
        },
      ]}
      normalize={(value) => (value ? value.toUpperCase().trim() : value)}
    >
      <Input ref={ref} onPressEnter={onDownEnter} />
    </Form.Item>
  );
};

InputCode.propTypes = {
  index: PropTypes.number,
  withResult: PropTypes.bool,
  onPressEnter: PropTypes.func,
};
