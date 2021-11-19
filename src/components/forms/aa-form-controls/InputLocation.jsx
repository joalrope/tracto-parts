import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

export const InputLocation = ({ index = -1 }) => {
  return (
    <Form.Item
      name={index !== -1 ? [index, 'location'] : 'location'}
      label={'Locación'}
      help='Introduzca la locación'
      rules={[
        {
          required: true,
          message: 'Debe Ingresar una locación para producto!',
        },
      ]}
      normalize={(value) => (value ? value.toUpperCase().trim() : value)}
    >
      <Input />
    </Form.Item>
  );
};

InputLocation.propTypes = {
  index: PropTypes.number,
};
