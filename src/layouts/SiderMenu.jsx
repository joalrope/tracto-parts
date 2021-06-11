import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons';

export const SiderMenu = () => {
  return (
    <Menu theme='dark' mode='inline' defaultSelectedKeys={['2']}>
      <Menu.Item key='1' icon={<UserOutlined />}>
        <span>Cotizador</span>
        <Link to='/app/quote' />
      </Menu.Item>
      <Menu.Item key='2' icon={<VideoCameraOutlined />}>
        <span>Ventas</span>
        <Link to='/app/sales' />
      </Menu.Item>
      <Menu.Item key='3' icon={<UploadOutlined />}>
        <span>Depositos</span>
        <Link to='/app/inventory' />
      </Menu.Item>
    </Menu>
  );
};
