import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import { GraphqlClientProvider } from './components/GraphqlClientProvider';
import { HttpClientConfig } from './HttpClientConfig/HttpClientConfig';
import store from './store';

const httpClientConfig: HttpClientConfig = new HttpClientConfig('https://api.graph.cool/simple/v1/ciyz901en4j590185wkmexyex');

ReactDOM.render(
  <GraphqlClientProvider client={ httpClientConfig } store={ store }>
    <App randomProp={12}/>
  </GraphqlClientProvider>,
  document.getElementById('root') as HTMLElement
);
