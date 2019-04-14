import React, { Component, ReactNode } from 'react';

import { graphql } from './graphql';
import { GET_USER_QUERY } from '../graphql/testQueries';

import XComponent from './XComponent';
import { CachingTypes } from '../constants/cachingTypes';
import { IGraphqlInjectedProps } from './interfaces/IGraphqlInjectedProps';
import { UPDATE_USER_MUTATION } from '../graphql/testMutations';

interface IAppProps {
  randomProp: number;
}

interface IAppState {
  showXComponent: boolean;
}

class App extends Component<IAppProps & IGraphqlInjectedProps, IAppState> {

  constructor(props: IAppProps & IGraphqlInjectedProps) {
    super(props);

    this.fetchAgain = this.fetchAgain.bind(this);
    this.toogleXComponent = this.toogleXComponent.bind(this);
    this.executeMutation = this.executeMutation.bind(this);

    this.state = {
      showXComponent: false
    };
  }

  public fetchAgain(): void {
    this.props.getUser.fetchQuery({
      id: 'cjtmt2cag0025lw10howm9sss'
    }).then((response: any) => {
      console.log(response);
    });
  }

  public toogleXComponent(): void {
    this.setState((prevState: IAppState) => {
      return {
        showXComponent: !prevState.showXComponent
      };
    });
  }

  public executeMutation(): void {
    this.props.updateUserMutation({
      id: 'cjtmt2cag0025lw10howm9wus',
      firstName: 'Vlad'
    }).then((response: any) => {
      console.log(response);
    })
  }

  public render(): ReactNode {
    const { showXComponent } = this.state;
    console.log('App props: ', this.props);

    return (
      <>
        <div> Up & Running! </div>
        <button onClick={ this.fetchAgain }> Fetch Again </button>
        <button onClick={ this.toogleXComponent }> Toogle XComponent </button>
        <button onClick={ this.executeMutation }> Execute Mutation </button>
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
  operation: UPDATE_USER_MUTATION
})(graphql<IAppProps>({
  operation: GET_USER_QUERY,
  variables: {
    id: 'cjtmt2cag0025lw10howm9wus'
  }
})(App));
