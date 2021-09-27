import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu, Col, Row, Space, Spin } from 'antd';
import { AntDesignOutlined, FacebookFilled, GithubOutlined /* , LoadingOutlined */ } from '@ant-design/icons'; //eslint-disable-line
import { startLogout } from '../actions/auth';
import { clearStore } from '../actions/ui';
import { AllForms } from '../components/forms/AllForms';
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
  const { isLoggedIn, checking } = useSelector((state) => state.auth);
  const { contentBackgroundImage, loading } = useSelector((state) => state.ui);
  const localtion = useLocation();

  const handleClick = (route) => {
    if (route.key === '/logout') {
      dispatch(startLogout());
      clearStore(dispatch);
      history.push('/home');
    }
  };

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  const role = isLoggedIn ? 'private' : 'public';
  return (
    <Layout>
      {isLoggedIn && (
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} className='--layout-sider__container'>
          <div className='--app__logo' />
          <SiderMenu />
        </Sider>
      )}
      <Layout>
        <Header>
          {!isLoggedIn && (
            <div className='--layout-header__logo'>
              <div className='--app__logo' />
            </div>
          )}
          <Menu theme='dark' mode='horizontal' selectedKeys={[localtion.pathname]} onClick={handleClick}>
            {routes
              .filter((route) => route.type === 'public' || (route.type === 'auth' && route.role === role))
              .map((route) => (
                <Menu.Item key={route.path}>
                  {route.name}
                  <Link to={route.path} />
                </Menu.Item>
              ))}
          </Menu>
        </Header>
        <Content className='--layout-content__container' style={{ backgroundImage: `url(${contentBackgroundImage})` }}>
          {(checking || loading) && (
            <div className='--layout-content__spinner'>
              <Spin /* indicator={loadingIcon}  */ size='large' />
            </div>
          )}
          <AppRouter type={role} />
          <AllForms />
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
