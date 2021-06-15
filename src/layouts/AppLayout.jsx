import React, { useState } from 'react';
import { Layout } from 'antd';
import { FooterContent } from './FooterContent';
import { HeaderContent } from './header-content/HeaderContent';
import { SiderContent } from './SiderContent';
import './app-layout.css';
import { ContentContent } from './ContentContent';
import { useSelector } from 'react-redux';

const { Header, Footer, Sider, Content } = Layout;

export const AppLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout>
      {isLoggedIn && (
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <SiderContent />
        </Sider>
      )}
      <Layout>
        <Header>
          <HeaderContent />
        </Header>
        <Content>
          {' '}
          <ContentContent />
        </Content>
        <Footer>
          <FooterContent />
        </Footer>
      </Layout>
    </Layout>
  );
};
