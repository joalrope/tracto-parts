import React from 'react';
import { Divider, Form, Input } from 'antd';
import './customer-add.scss';

export const CustomerContact = () => {
  return (
    <div className='-customer-contact__container'>
      <Divider orientation='center'>Contacto: </Divider>
      <Form.Item label='Nombre:' name='contactName'>
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
