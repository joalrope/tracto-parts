import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../src/store/store';
import { AppLayout } from './layouts/AppLayout';
import './App.less';

function App() {
  return (
    <div className='App'>
      <Provider store={store}>
        <AppLayout />
      </Provider>
    </div>
  );
}

export default App;
