import React, { useState } from 'react';
import { Layout } from 'antd';
import { FooterContent } from './FooterContent';
import { SiderContent } from './SiderContent';
//import './app-layout.css';
import { ContentContent } from './ContentContent';

import { Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
//import { MailOutlined, AppstoreOutlined } from '@ant-design/icons';
import { startLogout } from '../actions/auth';
import { routes } from '../router/routes';

const { Header, Footer, Sider, Content } = Layout;

export const AppLayout = () => {
  //const history = useHistory();
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const { isLoggedIn, currentPath } = useSelector((state) => state.auth);

  const handleClick = (e) => {
    console.log(e.key)
    if (e.key === '/') {
      dispatch(startLogout());
    }
    // dispatch(serCurrentPath(window.location.pathname))
    // history.push(currentPath)
  };

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  const type = (isLoggedIn)? 'private' : 'public';
  return (
    <Layout>
      <Header>
        <div className='--layout-logo__container'/>
        <Menu className='--public-menu__container' onClick={handleClick} theme="dark" mode="horizontal" defaultSelectedKeys={[currentPath]}>
          {routes.map((route) => {
            console.log(type, route.type)
            if (route.type === type) {
              //const key = index + 1;
              return <Menu.Item key={route.path} >
                      {route.name}
                      <Link to={route.path} />
                    </Menu.Item>;
            }
          })}
        </Menu>
        
        {/* {isLoggedIn && (
          <Menu className='--auth-menu__container' onClick={handleClick} selectedKeys={[currentPath]} mode='horizontal' theme='dark'>
            <Menu.Item key='logout' icon={<MailOutlined />}>
              <span>Salir</span>
              <Link to='/' />
            </Menu.Item>
          </Menu>
        )}
        {!isLoggedIn && (
          <Menu className='--auth-menu__container' onClick={handleClick} selectedKeys={[currentPath]} mode='horizontal' theme='dark'>
            <Menu.Item key={5} icon={<MailOutlined />}>
              <span>Ingresar</span>
              <Link to='/login' />
            </Menu.Item>
            <Menu.Item key={6} icon={<AppstoreOutlined />}>
              <span>Registrarse</span>
              <Link to='/register' />
            </Menu.Item>
          </Menu>
        )} */}
      </Header>
    <Layout>
      {isLoggedIn && (
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <SiderContent />
        </Sider>
      )}
        <Content>
          <ContentContent />
        </Content>
      </Layout>
        <Footer>
          <FooterContent />
        </Footer>
    </Layout>
  );
};
