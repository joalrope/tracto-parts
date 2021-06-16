import React from 'react';
import { SiderMenu } from './SiderMenu';
import './app-layout.css'

export const SiderContent = () => {
  return (
    <div className='--layout-sider__container'>
      {/* <div className='--layout__sider-logo'></div> */}
      <SiderMenu />
    </div>
  );
};
