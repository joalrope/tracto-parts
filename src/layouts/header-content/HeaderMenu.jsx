import React from 'react';
import { AuthOptions } from './AuthOptions';
import { PublicOptions } from './PublicOptions';

export const HeaderMenu = () => {
  return (
    <div className='--menu-options__container'>
      <PublicOptions />
      <AuthOptions />
    </div>
  );
};
