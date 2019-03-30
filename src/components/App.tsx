import React, { Component, ReactNode } from 'react';

import { graphql } from './graphql';
import { GET_USER_QUERY } from '../graphql/testQueries';

import XComponent from './XComponent';
import { CachingTypes } from '../constants/cachingTypes';

interface IAppProps {
  randomProp: number;
}

interface IAppState {
  showXComponent: boolean;
}

class App extends Component<IAppProps, IAppState> {

  constructor(props: IAppProps) {
    super(props);

    this.toogleXComponent = this.toogleXComponent.bind(this);

    this.state = {
      showXComponent: false
    };
  }

  public toogleXComponent(): void {
    this.setState((prevState: IAppState) => {
      return {
        showXComponent: !prevState.showXComponent
      };
    });
  }

  public render(): ReactNode {
    const { showXComponent } = this.state;
    console.log('App props: ', this.props);

    return (
      <>
        <div> Up & Running! </div>
        <button onClick={ this.toogleXComponent }> Toogle XComponent </button>
        {
          showXComponent && (
            <XComponent/>
          )
        }
      </>
    );
  }
}

export default graphql<IAppProps>({
  operation: GET_USER_QUERY,
  cachingType: CachingTypes.CacheAndNetwork,
  variables: {
    id: 'cjtmt2cag0025lw10howm9wus'
  }
})(App);
