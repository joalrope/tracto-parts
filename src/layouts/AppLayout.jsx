import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu, Col, Row, Space, Spin /* , PageHeader, Button */ } from 'antd';
import {
  AntDesignOutlined,
  FacebookFilled,
  GithubOutlined,
  /*EditOutlined /*LoadingOutlined ,,*/
} from '@ant-design/icons'; //eslint-disable-line
import { startLogout } from '../actions/auth';
import { clearStore, setCurrentPath } from '../actions/ui';
import { AllForms } from '../components/forms/AllForms';
import { AllPdfs } from '../components/pdfs/AllPdfs';
import history from '../helpers/history/history';
import { AppRouter } from '../router/AppRouter';
import { routes } from '../router/routes';
import { SiderMenu } from './SiderMenu';
import './app-layout.css';

const { Header, Footer, Sider, Content } = Layout;
const style = { fontSize: '18px', color: '$primary', verticalAlign: 'middle' };
//const loadingIcon = <LoadingOutlined style={{ fontSize: 64 }} spin />;

export const AppLayout = () => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const { isLoggedIn, checking, role } = useSelector((state) => state.auth);
  const { contentBackgroundImage, loading, currentPath } = useSelector((state) => state.ui);
  const location = useLocation();

  const handleClick = ({ key, keyPath }) => {
    const [path] = keyPath;
    dispatch(setCurrentPath(path));
    if (key === '/logout') {
      dispatch(startLogout());
      clearStore(dispatch);
      history.push('/home');
      dispatch(setCurrentPath('/home'));
    }
  };

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  const getParent = () => {
    return currentPath.substring(currentPath.lastIndexOf('/') + 1, currentPath.length).trim();
  };

  const mode = isLoggedIn ? 'private' : 'public';
  return (
    <Layout className='--main-layout__container'>
      {isLoggedIn && (
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} className='--layout-sider__container'>
          <div className='--app__logo' />
          <SiderMenu />
        </Sider>
      )}
      <Layout className='--main-layout__right'>
        <Header>
          {!isLoggedIn && (
            <div className='--layout-header__logo'>
              <div className='--app__logo' />
            </div>
          )}
          <Menu theme='dark' mode='horizontal' selectedKeys={[location.pathname]} onClick={handleClick}>
            {routes
              .filter(
                (route) =>
                  route.menu === 'header' && (route.type === 'public' || (route.type === 'auth' && route.mode === mode))
              )
              .map((route) => (
                <Menu.Item key={route.path}>
                  {route.name}
                  <Link to={route.path} />
                </Menu.Item>
              ))}
          </Menu>
        </Header>
        {isLoggedIn && location.pathname.startsWith('/app') && (
          <Menu
            mode='horizontal'
            selectedKeys={[location.pathname]}
            style={{ borderBottom: '1px dashed black', color: 'black', height: 35, justifyContent: 'end' }}
          >
            {routes
              .filter(
                (route) => route.menu === 'options' && route.parent === getParent() && route.access.includes(role)
              )
              .map((route) => {
                return (
                  <Menu.Item key={route.key} icon={route.icon} style={{ lineHeight: 1.5, margin: 5 }}>
                    {route.name}
                    <Link to={route.path} />
                  </Menu.Item>
                );
              })}
          </Menu>
        )}

        <Content className='--layout-content__container' style={{ backgroundImage: `url(${contentBackgroundImage})` }}>
          {(checking || loading) && (
            <div className='--layout-content__spinner'>
              <Spin /* indicator={loadingIcon}  */ size='large' />
            </div>
          )}

          <AllPdfs />
          <AllForms />
          <AppRouter />
        </Content>
        <Row>
          <Col xs={0} sm={24}>
            <Footer className='--layout-footer__container'>
              <Space align='baseline'>
                <div className='--layout-footer__info'>
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
              </Space>
            </Footer>
          </Col>
        </Row>
      </Layout>
    </Layout>
  );
};
