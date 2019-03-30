import React, { Component, ReactNode } from 'react';

import { graphql } from './graphql';
import { OperationTypes } from '../constants/operationTypes';
import { ALL_USERS_QUERY, GET_USER_QUERY } from '../graphql/testQueries';
import { gqlParser } from '../utils/gqlParser';

interface IAppProps {
  randomProp: number;
}

class App extends Component<IAppProps, {}> {

  public render(): ReactNode {
    console.log(this.props);

    return (
      <div>
        Up & Running!
      </div>
    );
  }
}

export default graphql<IAppProps>({
  operation: GET_USER_QUERY,
  variables: {
    id: 'cjtmt2cag0025lw10howm9wus'
  }
})(App);
