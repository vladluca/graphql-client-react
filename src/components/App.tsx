import React, { Component, ReactNode } from 'react';

import { graphql } from './graphql';

class App extends Component<{}, {}> {

  public render(): ReactNode {
    console.log('App props: ', this.props);
    return (
      <div>
        Up & Running!
      </div>
    );
  }
}

export default graphql<{}>()(App);
