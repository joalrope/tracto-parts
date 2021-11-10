import React from 'react';
import PropTypes from 'prop-types';
import { Form, InputNumber } from 'antd';
import { formatterNumber, parserNumber } from '../AllForms';

export const InputNumeric = ({ name, label, placeholder, rules, index = -1 }) => {
  return (
    <Form.Item name={index === -1 ? name : [index, name]} label={label} rules={rules}>
      <InputNumber
        placeholder={placeholder}
        style={{ textAlign: 'right' }}
        min={0.001}
        controls={false}
        decimalSeparator={','}
        precision={2}
        onFocus={(e) => e.target.select()}
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
  index: PropTypes.number,
};
