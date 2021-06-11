import React from 'react';
import { AppRouter } from '../router/AppRouter';

export const ContentContent = () => {
  const type = 'private';
  return (
    <div className='--layout__content'>
      <AppRouter type={type} />
    </div>
  );
};
