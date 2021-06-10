import React, { useState } from 'react';
import { Layout } from 'antd';
import { FooterContent } from './FooterContent';
import { HeaderContent } from './HeaderContent';
import { SiderContent } from './SiderContent';
import './app-layout.css';
import { ContentContent } from './ContentContent';

const { Header, Footer, Sider, Content } = Layout;

export const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout>
      {true && (
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
