import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

//const { SubMenu } = Menu;

export const HeaderContent = () => {
  const [current, setCurrent] = useState('mail');

  const handleClick = (e) => {
    console.log('click ', e);
    setCurrent({ current: e.key });
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal' theme='dark'>
      <Menu.Item key='home' icon={<MailOutlined />}>
        <span>Inicio</span>
        <Link to='/home' />
      </Menu.Item>
      <Menu.Item key='equipment' icon={<AppstoreOutlined />}>
        <span>Equipos</span>
        <Link to='/equipment' />
      </Menu.Item>
      <Menu.Item key='contact' icon={<AppstoreOutlined />}>
        <span>Contacto</span>
        <Link to='/contact' />
      </Menu.Item>
      <Menu.Item key='about' icon={<SettingOutlined />}>
        <span>Nosotros</span>
        <Link to='/about' />
      </Menu.Item>
    </Menu>
  );
};

/* {false && (
  <SubMenu key='SubMenu' icon={<SettingOutlined />} title=''>
    <Menu.ItemGroup title='Item 1'>
      <Menu.Item key='setting:1'>Option 1</Menu.Item>
      <Menu.Item key='setting:2'>Option 2</Menu.Item>
    </Menu.ItemGroup>
    <Menu.ItemGroup title='Item 2'>
      <Menu.Item key='setting:3'>Option 3</Menu.Item>
      <Menu.Item key='setting:4'>Option 4</Menu.Item>
    </Menu.ItemGroup>
  </SubMenu>
)} */
