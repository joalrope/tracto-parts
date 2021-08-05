import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { setCurrentPath } from '../../../../../actions/ui';
import { startLogin } from '../../../../../actions/auth';
import './login.scss';

export const Login = () => {
  const dispatch = useDispatch();

  const onFinish = ({ email, password }) => {
    dispatch(startLogin(email, password));
    dispatch(setCurrentPath('/home'));
  };

  const handleShowRegister = () => {
    dispatch(setCurrentPath('/register'));
  };

  const handleShowPasswordForgot = () => {
    dispatch(setCurrentPath('/forgot'));
  };

  return (
    <>
      {/* <div className='--login-page__body'></div> */}
      <div className='--login-page__container'>
        <Row justify='center'>
          <Col lg={4} sm={24}>
            <div className='--login-form__container'>
              <Form
                name='normal_login'
                className='--login-form'
                initialValues={{ remember: true }}
                autoComplete='false'
                onFinish={onFinish}
              >
                <h2 className='--login-form__title'>Iniciar Sesión</h2>
                <Form.Item
                  name='email'
                  rules={[{ required: true, message: 'Por Favor ingrese su dirección de correo!' }]}
                >
                  <Input prefix={<MailOutlined className='site-form-item-icon' />} placeholder='Correo' />
                </Form.Item>
                <Form.Item name='password' rules={[{ required: true, message: 'Por Favor ingrese la contraseña!' }]}>
                  <Input
                    prefix={<LockOutlined className='site-form-item-icon' />}
                    type='password'
                    placeholder='Contraseña'
                  />
                </Form.Item>
                <Form.Item>
                  <Form.Item name='remember' valuePropName='checked' noStyle>
                    <Checkbox className='--remember-check'>Recordarme</Checkbox>
                  </Form.Item>

                  <a className='--login-form__forgot' onClick={handleShowPasswordForgot}>
                    Olvidé la Contraseña
                  </a>
                </Form.Item>

                <Form.Item>
                  <Button type='primary' htmlType='submit' className='login-form-button'>
                    Ingresar
                  </Button>
                  <div className='--register-goto__text' onClick={handleShowRegister}>
                    No tiene cuenta?
                    <Link className='--register-goto__link' to='/register'>
                      Registrese!
                    </Link>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
