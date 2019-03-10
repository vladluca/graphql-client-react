import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

ReactDOM.render(
  <App randomProp={12}/>,
  document.getElementById('root') as HTMLElement
);
