import React from 'react';
import { Col, Divider, Form, Input, Row } from 'antd';
import { CloseSquareOutlined, PlusSquareOutlined } from '@ant-design/icons';

import './customer-add.scss';

export const CustomerContact = () => {
  return (
    <div>
      <Divider orientation='center'>Contactos: </Divider>

      <Form.List name='contact'>
        {(contact, { add, remove }) => {
          return (
            <div className='--contact-data__row' style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              {contact.map((field, index) => (
                <Row
                  key={field.key}
                  gutter={12}
                  justify='start'
                  style={{ flexDirection: 'row', width: '100%', marginBottom: 0 }}
                >
                  <Col xs={24} md={24} lg={8}>
                    <Form.Item
                      label={
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                          <div>Nombre</div>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            {contact.length - 1 === index && (
                              <PlusSquareOutlined
                                style={{
                                  color: '#5cb85c',
                                  fontSize: '18px',
                                  marginLeft: 10,
                                }}
                                onClick={() => add(field.name)}
                              />
                            )}
                          </div>
                        </div>
                      }
                      name={[index, 'contactName']}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={24} lg={8}>
                    <Form.Item label='Teléfono:' name={[index, 'contactPhone']}>
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={24} lg={8} style={{ paddingRight: 0, display: 'flex', flexDirection: 'row' }}>
                    <Form.Item label='Correo:' name={[index, 'contactEmail']}>
                      <Input />
                    </Form.Item>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {contact.length > 1 ? (
                        <CloseSquareOutlined
                          style={{
                            color: '#dc1919',
                            fontSize: 18,
                            marginTop: 15,
                            marginLeft: 5,
                          }}
                          onClick={() => remove(field.name)}
                        />
                      ) : null}
                    </div>
                  </Col>
                </Row>
              ))}
            </div>
          );
        }}
      </Form.List>
    </div>
  );
};

/* export const CustomerContact = ({ form }) => {
  return (
    <div className='-customer-contact__container'>
      <Divider orientation='center'>Contacto: </Divider>}
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
}; */
