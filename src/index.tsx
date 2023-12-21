import React from 'react';
import ReactDOM from 'react-dom';
import '@fontsource/xanh-mono';
import '@fontsource/dm-serif-text';
import '@fontsource-variable/karla';

import './index.scss';
import App from './App';
import './utility/array';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
