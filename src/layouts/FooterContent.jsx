import React from 'react';
import {
  AntDesignOutlined,
  FacebookFilled,
  GithubOutlined,
} from '@ant-design/icons';

const style = { fontSize: '18px', color: 'red', verticalAlign: 'middle' };

export const FooterContent = () => {
  return (
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
  );
};
