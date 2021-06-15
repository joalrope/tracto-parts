import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

export const PublicOptions = () => {
  const [current, setCurrent] = useState('home');

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <div className='--public-options__container'>
      <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal' theme='dark'>
        <Menu.Item key='/home' icon={<MailOutlined />}>
          <span>Inicio</span>
          <Link to='/home' />
        </Menu.Item>
        <Menu.Item key='/equipment' icon={<AppstoreOutlined />}>
          <span>Equipos</span>
          <Link to='/equipment' />
        </Menu.Item>
        <Menu.Item key='/contact' icon={<AppstoreOutlined />}>
          <span>Contacto</span>
          <Link to='/contact' />
        </Menu.Item>
        <Menu.Item key='/about' icon={<SettingOutlined />}>
          <span>Nosotros</span>
          <Link to='/about' />
        </Menu.Item>
      </Menu>
    </div>
  );
};
