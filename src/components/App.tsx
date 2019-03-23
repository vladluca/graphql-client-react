import React, { Component, ReactNode } from 'react';

import { graphql } from './graphql';
import { OperationTypes } from '../constants/operationTypes';
import { ACCOUNT_LIVE_HOURS_QUERY, ACCOUNT_PROFILE_PICTURE_QUERY } from '../graphql/testQueries';
import { gqlParser } from '../utils/gqlParser';
import { MEMBER_SIGN_UP_MUTATION } from '../graphql/testMutations';
import { ACCOUNT_PROFILE_PICTURE } from '../graphql/testFragments';

interface IAppProps {
  randomProp: number;
}

class App extends Component<IAppProps, {}> {

  public render(): ReactNode {
    console.log('-----', gqlParser(MEMBER_SIGN_UP_MUTATION));
    console.log('-----', MEMBER_SIGN_UP_MUTATION);
    console.log('App props: ', this.props);
    return (
      <div>
        Up & Running!
      </div>
    );
  }
}

export default graphql<IAppProps>({
  operationType: OperationTypes.Query
})(App);
