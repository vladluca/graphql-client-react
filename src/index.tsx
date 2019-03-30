import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import { GraphqlClientProvider } from './components/GraphqlClientProvider';
import { HttpClientConfig } from './HttpClientConfig/HttpClientConfig';
import store from './store';

// Other test api: https://api.graph.cool/simple/v1/ciyz901en4j590185wkmexyex
const httpClientConfig: HttpClientConfig = new HttpClientConfig('http://localhost:4000/graphql');

ReactDOM.render(
  <GraphqlClientProvider client={ httpClientConfig } store={ store }>
    <App randomProp={12}/>
  </GraphqlClientProvider>,
  document.getElementById('root') as HTMLElement
);
