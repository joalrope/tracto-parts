import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
//import { DiffOutlined, TrademarkCircleOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { routes } from '../router/routes';

export const SiderMenu = () => {
  const location = useLocation();

  return (
    <Menu theme='dark' mode='inline' selectedKeys={[location.pathname]} defaultSelectedKeys={['/app/stock']}>
      {routes.sider
        .filter((route) => route.menu === 'sider')
        .map((route) => {
          return (
            <Menu.Item key={route.path}>
              {route.name}
              <Link to={route.path} />
            </Menu.Item>
          );
        })}
    </Menu>
  );
};
