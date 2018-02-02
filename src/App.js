import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import './css/reset.css';
import Main from './js/Main';

const renderMain = () => {
  render(
    <AppContainer>
      <Main />
    </AppContainer>,
    document.getElementById('app')
  );
};

renderMain();

if (module.hot) {
  module.hot.accept();
}
