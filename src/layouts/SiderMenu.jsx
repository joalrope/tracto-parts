import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { serCurrentPath } from '../actions/auth';

export const SiderMenu = () => {
  const dispatch = useDispatch();
  const { currentPath } = useSelector((state) => state.auth);
  const handleClick = (route) => {
    dispatch(serCurrentPath(route.key));
  };
  return (
    <Menu
      theme='dark'
      mode='inline'
      selectedKeys={[currentPath]}
      defaultSelectedKeys={['/app/quote']}
      onClick={handleClick}
    >
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
