import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';

export const AuthOptions = () => {
  const dispatch = useDispatch();
  const [current, setCurrent] = useState('home');
  const { isLoggedIn, currentPath } = useSelector((state) => state.auth);

  const handleClick = (e) => {
    setCurrent(e.key);
    if (e.key === 'logout') {
      dispatch(startLogout());
    }
  };
  return (
    <div className='--auth-options__container'>
      {isLoggedIn && (
        <Menu onClick={handleClick} selectedKeys={[currentPath]} mode='horizontal' theme='dark'>
          <Menu.Item key='logout' icon={<MailOutlined />}>
            <span>Salir</span>
            <Link to='/' />
          </Menu.Item>
        </Menu>
      )}
      {!isLoggedIn && (
        <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal' theme='dark'>
          <Menu.Item key='login' icon={<MailOutlined />}>
            <span>Ingresar</span>
            <Link to='/login' />
          </Menu.Item>
          <Menu.Item key='register' icon={<AppstoreOutlined />}>
            <span>Registrarse</span>
            <Link to='/register' />
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
};
