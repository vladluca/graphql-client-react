import { ComponentType } from 'react'

import { IGraphQLOptions } from './src/components/interfaces/IGraphQLOptions';

declare function graphql(options: IGraphQLOptions): ComponentType;
