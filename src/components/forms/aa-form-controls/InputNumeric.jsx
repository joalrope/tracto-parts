import React from 'react';
import PropTypes from 'prop-types';
import { Form, InputNumber } from 'antd';
import { formatterNumber, parserNumber } from '../AllForms';

export const InputNumeric = ({ name, label, placeholder, rules, onPressEnter, index = -1 }) => {
  return (
    <Form.Item
      name={index === -1 ? name : [index, name]}
      label={label}
      help={`Ingrese ${label.toLowerCase()} `}
      rules={rules}
    >
      <InputNumber
        placeholder={placeholder}
        style={{ textAlign: 'right' }}
        min={0.001}
        controls={false}
        decimalSeparator={','}
        precision={2}
        onFocus={(e) => e.target.select()}
        onPressEnter={onPressEnter}
        formatter={(value) => formatterNumber(value)}
        parser={(value) => parserNumber(value)}
      />
    </Form.Item>
  );
};

InputNumeric.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  rules: PropTypes.array,
  onPressEnter: PropTypes.func,
  index: PropTypes.number,
};

export const InputQty = ({ index }) => {
  return (
    <InputNumeric
      name='qty'
      label='Cantidad'
      placeholder='indique la cantidad'
      rules={[{ required: true, type: 'number', min: 0.0002, message: 'Ingrese la cantidad del producto' }]}
      index={index}
    />
  );
};

InputQty.propTypes = {
  index: PropTypes.number,
};

export const InputCostPrice = ({ index, onPressEnter }) => {
  return (
    <InputNumeric
      name='costPrice'
      label='Precio'
      placeholder='indique el Precio de costo'
      rules={[{ required: true, type: 'number', min: 0.0002, message: 'Indique el precio de costo' }]}
      index={index}
      onPressEnter={onPressEnter}
    />
  );
};

InputCostPrice.propTypes = {
  index: PropTypes.number,
  onPressEnter: PropTypes.func,
};

export const InputSalePrice = ({ index }) => {
  return (
    <InputNumeric
      name='salePrice'
      label='Precio de Venta'
      placeholder='indique el Precio de venta'
      rules={[{ required: true, type: 'number', min: 0.0002, message: 'Indique el precio de venta' }]}
      index={index}
    />
  );
};

InputSalePrice.propTypes = {
  index: PropTypes.number,
};
