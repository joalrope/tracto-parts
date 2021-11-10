import React from 'react';
import PropTypes from 'prop-types';
import { Input, Form } from 'antd';

export const InputCode = ({ onPressEnter, index = -1 }) => {
  return (
    <Form.Item
      name={index !== -1 ? [index, 'code'] : 'code'}
      label={'Código:'}
      rules={[
        {
          required: true,
          message: 'Ingrese el código del producto!',
        },
      ]}
      normalize={(value) => (value ? value.toUpperCase() : value)}
    >
      <Input onPressEnter={onPressEnter} />
    </Form.Item>
  );
};

InputCode.propTypes = {
  index: PropTypes.number,
  onPressEnter: PropTypes.func,
};
