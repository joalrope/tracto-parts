import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons';

export const SiderMenu = () => {
  return (
    <Menu theme='dark' mode='inline' defaultSelectedKeys={['/app/quote']}>
      <Menu.Item key='/app/quote' icon={<UserOutlined />}>
        <span>Cotizador</span>
        <Link to='/app/quote' />
      </Menu.Item>
      <Menu.Item key='/app/sales' icon={<VideoCameraOutlined />}>
        <span>Ventas</span>
        <Link to='/app/sales' />
      </Menu.Item>
      <Menu.Item key='/app/inventory' icon={<UploadOutlined />}>
        <span>Depositos</span>
        <Link to='/app/inventory' />
      </Menu.Item>
    </Menu>
  );
};
