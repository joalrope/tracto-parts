import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPath } from '../actions/ui';

export const SiderMenu = () => {
  const dispatch = useDispatch();
  const { currentPath } = useSelector((state) => state.auth);
  const handleClick = (route) => {
    dispatch(setCurrentPath(route.key));
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
