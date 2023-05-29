import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { WindowSize } from '@features/layout/Types';

import { store } from '@app/config/Redux';
import Routes from '@app/config/Routes';
import { changeScrollTop, changeWindowSize } from '@app/features/layout/Slice';

import '@app/stylesheets/App.scss';

if (module.hot) {
  module.hot.accept();
}

const App = (): JSX.Element => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

window.addEventListener('scroll', (e) => {
  store.dispatch(changeScrollTop(window.scrollY));
});

window.addEventListener('resize', (e) => {
  const windowSize: WindowSize = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  store.dispatch(changeWindowSize(windowSize));
});

const container = document.getElementById('yield');
const root = createRoot(container!);

root.render(<App />);
