import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import { GraphqlClientProvider } from './components/GraphqlClientProvider';
import { HttpClientConfig } from './HttpClientConfig/HttpClientConfig';
import store from './store';
import { AxiosError } from 'axios';

// Other test api: https://api.graph.cool/simple/v1/ciyz901en4j590185wkmexyex
const httpClientConfig: HttpClientConfig = new HttpClientConfig('http://localhost:4000/graphql');

httpClientConfig.setRequestInterceptor((config: any) => {
  console.log(config);
  const authToken: string | null = localStorage.getItem('auth-token');
  if (authToken) {
    config.headers.authorization = 'Bearer ' + localStorage.getItem('auth-token');
  }

  return config;
});

httpClientConfig.setRequestInterceptorErrorHandler((error: AxiosError) => {
  return Promise.reject(error);
});

ReactDOM.render(
  <GraphqlClientProvider client={ httpClientConfig } store={ store }>
    <App randomProp={12}/>
  </GraphqlClientProvider>,
  document.getElementById('root') as HTMLElement
);
