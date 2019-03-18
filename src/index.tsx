import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import { GraphqlClientProvider } from './components/GraphqlClientProvider';
import { HttpClientConfig } from './HttpClientConfig/HttpClientConfig';
import store from './store';

const httpClientConfig: HttpClientConfig = new HttpClientConfig('http://www.example.com/api');

ReactDOM.render(
  //<Provider store={store}>
    <GraphqlClientProvider client={ httpClientConfig } store={ store }>
      <App randomProp={12}/>
    </GraphqlClientProvider>
  //</Provider>
  ,
  document.getElementById('root') as HTMLElement
);
