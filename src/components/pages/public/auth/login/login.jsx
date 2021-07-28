import React from 'react';
//import { useDispatch } from 'react-redux';
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
//import { useHistory } from 'react-router-dom';

//import { serCurrentPath, startLogin } from '../../../../../actions/auth';
//import { goBack } from '../controllers/goBack';
import './login.scss';

export const Login = () => {
  //const history = useHistory();
  //const dispatch = useDispatch();

  const onFinish = (values) => {
    console.log(values);
    /* dispatch(startLogin(Email, Password));
    dispatch(serCurrentPath('/home'));
    history.push('/app/sales'); */
  };

  /*   const handleShowRegister = () => {
    history.push('/register');
    goBack();
  };

  const handleShowPasswordForgot = () => {
    history.push('/forgot');
    goBack();
  };

  const handleLoginFacebk = () => {};

  const handleLoginGoogle = () => {};

  const handleLoginTwittr = () => {}; */

  return (
    <Row className='--login-form__row'>
      <Col lg={4} sm={24}>
        <Form name='normal_login' className='--login-form' initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item name='username' rules={[{ required: true, message: 'Por Favor ingrese el nombre de usuario!' }]}>
            <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Usuario' />
          </Form.Item>
          <Form.Item name='password' rules={[{ required: true, message: 'Por Favor ingrese la contraseña!' }]}>
            <Input prefix={<LockOutlined className='site-form-item-icon' />} type='password' placeholder='Contraseña' />
          </Form.Item>
          <Form.Item>
            <Form.Item name='remember' valuePropName='checked' noStyle>
              <Checkbox className='--remember-check'>Recordarme</Checkbox>
            </Form.Item>

            <a className='--login-form__forgot' href=''>
              Olvidé la Contraseña
            </a>
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' className='login-form-button'>
              Ingresar
            </Button>
            <a className='--register-goto' href=''>
              Registrame ahora!
            </a>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
