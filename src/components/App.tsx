import React, { Component, ReactNode } from 'react';

import { graphql } from './graphql';
import { OperationTypes } from '../constants/operationTypes';
import { ACCOUNT_LIVE_HOURS_QUERY, ACCOUNT_PROFILE_PICTURE_QUERY, ALL_USERS_QUERY } from '../graphql/testQueries';
import { gqlParser } from '../utils/gqlParser';
import { MEMBER_SIGN_UP_MUTATION } from '../graphql/testMutations';
import { ACCOUNT_PROFILE_PICTURE } from '../graphql/testFragments';

interface IAppProps {
  randomProp: number;
}

class App extends Component<IAppProps, {}> {

  public render(): ReactNode {
    console.log('-----', gqlParser(ACCOUNT_LIVE_HOURS_QUERY));
    console.log('-----', ACCOUNT_LIVE_HOURS_QUERY);
    console.log('App props: ', this.props);
    return (
      <div>
        Up & Running!
      </div>
    );
  }
}

export default graphql<IAppProps>({
  operation: ALL_USERS_QUERY
})(App);
