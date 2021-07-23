import React from 'react';
import { Form, Input } from 'antd';

export const CustomerContact = () => {
  return (
    <div>
      <Form.Item label='Contacto:' name='contactName'>
        <Input />
      </Form.Item>
      <Form.Item label='Teléfono:' name='contactPhone'>
        <Input />
      </Form.Item>
      <Form.Item label='Correo:' name='contactEmail'>
        <Input />
      </Form.Item>
    </div>
  );
};
