import { createStore, Store } from 'redux';

import { graphqlClientReducer } from '../reducers';

const store: Store = createStore(graphqlClientReducer);

export default store;
