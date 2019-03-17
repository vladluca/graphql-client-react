import React, { Context } from 'react';

import { IGraphqlClientContextValue } from '../components/interfaces/IGraphqlClientContextValue';

export type GraphqlClientContextValue = IGraphqlClientContextValue | undefined;

export const GraphqlClientContext: Context<GraphqlClientContextValue> = React.createContext<GraphqlClientContextValue>(undefined);
