import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import { GraphqlClientProvider } from './components/GraphqlClientProvider';
import { HttpClientConfig } from './HttpClientConfig/HttpClientConfig';

const httpClientConfig: HttpClientConfig = new HttpClientConfig('http://www.example.com/api');

ReactDOM.render(
  <GraphqlClientProvider client={ httpClientConfig }>
    <App randomProp={12}/>
  </GraphqlClientProvider>,
  document.getElementById('root') as HTMLElement
);
