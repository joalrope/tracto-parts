import React /* , { useState } */ from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
//import { MailOutlined, AppstoreOutlined } from '@ant-design/icons';
import { AntDesignOutlined, FacebookFilled, GithubOutlined } from '@ant-design/icons';
import { serCurrentPath } from '../actions/auth';
import { routes } from '../router/routes';
import { AppRouter } from '../router/AppRouter';
import './app-layout.css';
import { SiderMenu } from './SiderMenu';

const { Header, Footer, Sider, Content } = Layout;
const style = { fontSize: '18px', color: 'red', verticalAlign: 'middle' };

export const AppLayout = () => {
  const dispatch = useDispatch();
  //const [collapsed, setCollapsed] = useState(false);
  const { isLoggedIn, currentPath } = useSelector((state) => state.auth);

  const handleClick = (route) => {
    dispatch(serCurrentPath(route.key));
  };

  /*  const onCollapse = () => {
    setCollapsed(!collapsed);
  }; */

  const status = isLoggedIn ? 'private' : 'public';
  return (
    <Layout>
      <Sider
        breakpoint='lg'
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        //collapsible
        //collapsed={collapsed}
        //onCollapse={onCollapse}
      >
        <div className='--layout-header__logo' />
        isLoggedIn && <SiderMenu />
      </Sider>
      <Layout>
        <Header>
          <Menu theme='dark' mode='horizontal' selectedKeys={[currentPath]} onClick={handleClick}>
            {routes
              .filter((route) => route.type === 'public' || (route.type === 'auth' && route.role === status))
              .map((route) => (
                <Menu.Item key={route.path}>
                  {route.name}
                  <Link to={route.path} />
                </Menu.Item>
              ))}
          </Menu>
        </Header>
        <Content className='--layout__content'>
          <AppRouter type={'public'} />
        </Content>
        <Footer className='--layout-footer__container'>
          <div className='--layout__footer'>
            {new Date().getFullYear()} -{'  '}
            <a href='https://ant.design/' target='blank'>
              <AntDesignOutlined style={style} />
            </a>
            {'  '}
            Ant Design - App design and development by Joalrope{'  '}
            <a href='https://www.facebook.com/Joalrope' target='blank'>
              <FacebookFilled style={style} />
            </a>
            {'  '}
            {'  '}
            <a href='https://github.com/joalrope' target='blank'>
              <GithubOutlined style={style} />
            </a>
            {'  '}
          </div>
        </Footer>
      </Layout>
    </Layout>

    /*    <Layout>
      <Header>
        <div className='--layout-logo__container' />
        <Menu
          className='--public-menu__container'
          onClick={handleClick}
          theme='dark'
          mode='horizontal'
          defaultSelectedKeys={[currentPath]}
        >
          {routes.map((route) => {
            console.log(type, route.type);
            if (route.type === type) {
              //const key = index + 1;
              return (
                <Menu.Item key={route.path}>
                  {route.name}
                  <Link to={route.path} />
                </Menu.Item>
              );
            }
          })}
        </Menu>
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
   */
  );
};
