import React, { Component, ReactNode } from 'react';

import { graphql } from './graphql';
import { OperationType } from '../constants/operationType';

interface IAppProps {
  randomProp: number;
}

class App extends Component<IAppProps, {}> {

  public render(): ReactNode {
    console.log('App props: ', this.props);
    return (
      <div>
        Up & Running!
      </div>
    );
  }
}

export default graphql<IAppProps>({
  operationType: OperationType.Query
})(App);
