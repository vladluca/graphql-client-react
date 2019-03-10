import React, { Component, ReactNode } from 'react';

import { graphql } from './graphql';

interface IAppProps {
  randomProp: number
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

export default graphql<IAppProps>()(App);
