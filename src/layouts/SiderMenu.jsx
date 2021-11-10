import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Menu } from 'antd';
import history from '../helpers/history/history';
//import { DiffOutlined, TrademarkCircleOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { routes } from '../router/routes';
import { setCurrentPath } from '../actions/ui';

export const SiderMenu = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);

  const handleClick = (route) => {
    const currentRoute = route.keyPath[0];
    dispatch(setCurrentPath(currentRoute));
    const { redirectTo } = routes.find((el) => el.path === currentRoute);

    if (redirectTo) {
      history.push(redirectTo);
    }
  };

  return (
    <Menu
      theme='dark'
      mode='inline'
      selectedKeys={[location.pathname]}
      defaultSelectedKeys={['/app/stock']}
      onClick={handleClick}
    >
      {routes
        .filter((route) => route.menu === 'sider' && route.access.includes(role))
        .map((route) => {
          return (
            <Menu.Item key={route.key} icon={route.icon}>
              {route.name}
              <Link to={route.path} />
            </Menu.Item>
          );
        })}
    </Menu>
  );
};
