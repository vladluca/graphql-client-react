import React, { Component, ReactNode } from 'react';

import { IQueryContainerProps } from '../interfaces/IQueryContainerProps';

/**
 * QueryContainer
 */
export default class QueryContainer extends Component<IQueryContainerProps> {
  render(): ReactNode {
    console.log(this.props.client);

    return this.props.children({
      operationType: this.props.options.operationType
    });
  }
}
