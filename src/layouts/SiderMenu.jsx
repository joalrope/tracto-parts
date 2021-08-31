import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons';

export const SiderMenu = () => {
  const location = useLocation();

  return (
    <Menu theme='dark' mode='inline' selectedKeys={[location.pathname]} defaultSelectedKeys={['/app/quote']}>
      <Menu.Item key='/app/quote' icon={<UserOutlined />}>
        Cotizador
        <Link to='/app/quote' />
      </Menu.Item>
      <Menu.Item key='/app/sales' icon={<VideoCameraOutlined />}>
        Ventas
        <Link to='/app/sales' />
      </Menu.Item>
      <Menu.Item key='/app/inventory' icon={<UploadOutlined />}>
        Depositos
        <Link to='/app/inventory' />
      </Menu.Item>
    </Menu>
  );
};
