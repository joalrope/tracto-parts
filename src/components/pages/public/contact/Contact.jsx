import React from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import { HomeOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import './contact.scss';

const { TextArea } = Input;

export const Contact = () => {
  const [form] = Form.useForm();
  const onFinish = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
        // Submit values
        // submitValues(values);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <section id='contact' className='--contact-page'>
      <div className='container'>
        <div className='section-title'>
          <h2>Contactenos</h2>
        </div>

        <div className='--section-map'>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d1974.1805712671905!2d-62.7956378!3d8.2668053!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sve!4v1629462376215!5m2!1ses!2sve'
            style={{ border: 0, width: '100%', height: 250 }}
            allowFullScreen={true}
            loading='lazy'
          />
        </div>

        <div className='--section-info'>
          <div className='--info-cols'>
            <div className='--info-items__details'>
              <div className='--address-info'>
                <div className='--info-icon'>
                  <HomeOutlined />
                </div>
                <div className='--info-data'>
                  <h4>Ubicación:</h4>
                  <p>Zona Industrial Los Pinos Transversal 7 Parcela. Puerto Ordaz Estado Bolívar. Venezuela</p>
                </div>
              </div>

              <div className='--email-info'>
                <div className='--info-icon'>
                  <MailOutlined />
                </div>
                <div className='--info-data'>
                  <h4>Email:</h4>
                  <p>tractocenter_71@gmail.com</p>
                </div>
              </div>

              <div className='--phone-info'>
                <div className='--info-icon'>
                  <PhoneOutlined />
                </div>
                <div className='--info-data'>
                  <h4>Llamenos:</h4>
                  <p>+58 (0286) 994 8874</p>
                </div>
              </div>
            </div>
            <div className='--info-form-details'>
              <Form form={form} className='--contact-form' name='contact'>
                <Form.Item className='--row-items__one' style={{ marginBottom: 0 }}>
                  <Row gutter={16}>
                    <Col lg={12} md={24} sm={24} xs={24}>
                      <Form.Item
                        className='--name-item'
                        name='name'
                        rules={[
                          {
                            required: true,
                            message: 'Debe indicar un nombre!',
                          },
                        ]}
                        //style={{ display: 'inline-block', width: 'calc(50% - 12px)', margin: '0 24px 0 0' }}
                      >
                        <Input placeholder='Su nombre' size='large' />
                      </Form.Item>
                    </Col>
                    <Col xs={24} lg={12}>
                      <Form.Item
                        className='--email-item'
                        name='email'
                        rules={[{ required: true }]}
                        //style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
                      >
                        <Input placeholder='Su correo' size='large' />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form.Item>
                <Form.Item
                  className='--subject-item'
                  name='subject'
                  rules={[
                    {
                      required: true,
                      message: 'Debe indicar un text!',
                    },
                  ]}
                  style={{ display: 'inline-block', width: '100%' }}
                >
                  <Input placeholder='Asunto' size='large' />
                </Form.Item>
                <Form.Item
                  name='address'
                  rules={[
                    {
                      required: true,
                      message: 'agrege la dirección del cliente!',
                    },
                  ]}
                >
                  <TextArea rows={5} placeholder='Mensaje' />
                </Form.Item>
              </Form>
              <div className='submit-button__container'>
                <Button className='--submit-button' type='primary' onClick={onFinish}>
                  Enviar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
