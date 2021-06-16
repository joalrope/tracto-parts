import React from 'react';
import { useSelector } from 'react-redux';
import { AppRouter } from '../router/AppRouter';

export const ContentContent = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const type = (isLoggedIn)? 'private' : 'public';
  return (
    <div className='--layout__content'>
      {isLoggedIn && <AppRouter type={type} />}
    </div>
  );
};
