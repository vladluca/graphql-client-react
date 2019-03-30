import React, { Component, ReactNode } from 'react';

import { graphql } from './graphql';
import { GET_USER_QUERY } from '../graphql/testQueries';
import { CachingTypes } from '../constants/cachingTypes';

class XComponent extends Component<{}, {}> {
  public render(): ReactNode {
    console.log('X Component props: ', this.props);

    return (
      <>
        <div> I am X Component! </div>
      </>
    );
  }
}

export default graphql({
  operation: GET_USER_QUERY,
  cachingType: CachingTypes.NetworkOnly,
  variables: {
    id: 'cjtmt2cag0025lw10howm9wus'
  }
})(XComponent);
