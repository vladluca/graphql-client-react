import React, { Component, ReactNode } from 'react';
import { graphql } from './graphql';
import { AxiosResponse } from 'axios';

import XComponent from './XComponent';

import { IGraphqlInjectedProps } from './interfaces/IGraphqlInjectedProps';

import { ALL_USERS_QUERY, GET_USER_QUERY } from '../graphql/testQueries';
import { LOGIN_MUTATION, UPDATE_USER_MUTATION } from '../graphql/testMutations';

import { CachingTypes } from '../constants/cachingTypes';

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
    this.updateUserMutation = this.updateUserMutation.bind(this);
    this.loginMutation = this.loginMutation.bind(this);

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

  public loginMutation(): void {
    this.props.loginMutation({
      email: 'vlad.luca@hotmail.com',
      password: 'F4K3rqL'
    }).then((response: AxiosResponse) => {
      localStorage.setItem('auth-token', response.data.login.token);
    });
  }

  public updateUserMutation(): void {
    this.props.updateUserMutation({
      id: 'cjtmt2cag0025lw10howm9wus',
      firstName: 'Vlad'
    }, {
      firstName: 'Vladimir',
      lastName: 'Lucas'
    }).then((response: any) => {
      console.log(response);
    });
  }

  public render(): ReactNode {
    const { showXComponent } = this.state;
    console.log('App props: ', this.props);

    return (
      <>
        <div> Up & Running! </div>
        <button onClick={ this.fetchAgain }> Fetch Again </button>
        <button onClick={ this.toogleXComponent }> Toogle XComponent </button>
        <button onClick={ this.loginMutation }> Login </button>
        <button onClick={ this.updateUserMutation }> Update User </button>
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
  operation: ALL_USERS_QUERY
})(graphql<IAppProps>({
  operation: LOGIN_MUTATION
})(graphql<IAppProps>({
  operation: UPDATE_USER_MUTATION
})(graphql<IAppProps>({
  operation: GET_USER_QUERY,
  variables: {
    id: 'cjtmt2cag0025lw10howm9wus'
  }
})(App))));
