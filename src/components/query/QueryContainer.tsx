import React, { Component, ReactNode } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { IQueryContainerProps } from '../interfaces/IQueryContainerProps';
import { IReduxState } from '../interfaces/IReduxState';
import { IQueryContainerReduxStateProps } from '../interfaces/IQueryContainerReduxStateProps';
import { IQueryContainerReduxDispatchProps } from '../interfaces/IQueryContainerReduxDispatchProps';
import { IQueryContainerState } from '../interfaces/IQueryContainerState';

import { setQueryResult } from '../../actions/query';
import { variablesChecker } from '../../utils/variablesChecker';
import { AxiosError } from 'axios';
import HttpClient from '../../HttpClient/HttpClient';
import { CachingTypes } from '../../constants/cachingTypes';
import { cachingTypeChecker } from '../../utils/cachingTypeChecker';
import clone from 'lodash/clone';
import each from 'lodash/each';

type QueryContainerProps = IQueryContainerProps & IQueryContainerReduxStateProps & IQueryContainerReduxDispatchProps;

/**
 * QueryContainer
 */
class QueryContainer extends Component<QueryContainerProps, IQueryContainerState> {

  /**
   * fetchedFromServer: boolean
   */
  private fetchedFromServer: boolean;

  /**
   * @param props
   */
  constructor(props: QueryContainerProps) {
    super(props);

    this.fetchQuery = this.fetchQuery.bind(this);

    this.fetchedFromServer = false;

    this.state = {
      noCacheQueryResult: null
    };
  }

  componentWillMount(): void {
    const { options: { executeOnMount, cachingType }} = this.props;

    if (executeOnMount === false && typeof cachingType !== 'undefined') {
      throw new Error('When executeOnMount is false, you can not specify a caching type');
    }
  }

  componentDidMount(): void {
    const { options: { executeOnMount }} = this.props;

    if (executeOnMount === true || typeof executeOnMount === 'undefined') {
      this.executeQuery();
    }
  }

  fetchQuery(newVariables?: object): Promise<any> {
    const {
      client,
      graphqlDocument,
      options: {
        variables
      }
    } = this.props;

    const currentVariables: object | undefined = newVariables ? newVariables : variables;
    const queryKey: string = this.getQueryKey(currentVariables);

    if (client) {
      if (graphqlDocument.variables) {
        try {
          variablesChecker(graphqlDocument.variables, currentVariables ? currentVariables : {});
        } catch (e) {
          throw e;
        }
      }

      // fetchQuery method will always use NetworkOnly as caching type
      return this.fetchData(client, queryKey, currentVariables, CachingTypes.NetworkOnly);
    } else {
      throw new Error('No graphql client on context!');
    }
  }

  public executeQuery(): void {
    const {
      client,
      graphqlDocument,
      options: {
        variables,
        cachingType
      },
      queryResults
    } = this.props;
    const queryKey: string = this.getQueryKey(variables);

    if (client) {
      if (graphqlDocument.variables) {
        try {
          variablesChecker(graphqlDocument.variables, variables ? variables : {});

          if (cachingType) {
            cachingTypeChecker(cachingType);
          }
        } catch (e) {
          throw e;
        }
      }

      let shouldFetchFromServer: boolean;

      switch (cachingType) {
        case CachingTypes.CacheAndNetwork:
          shouldFetchFromServer = true;
          break;

        case CachingTypes.NetworkOnly:
          shouldFetchFromServer = true;
          break;

        case CachingTypes.CacheOnly:
          shouldFetchFromServer = false;
          break;

        case CachingTypes.NoCache:
          shouldFetchFromServer = true;
          break;

        case CachingTypes.CacheFirst:
        default:
          shouldFetchFromServer = !queryResults[queryKey];
          break;

      }

      if (shouldFetchFromServer) {
        this.fetchData(client, queryKey, variables, cachingType);
      }
    } else {
      throw new Error('No graphql client on context!');
    }
  }

  /**
   * @param client
   * @param queryKey
   * @param variables
   * @param cachingType
   */
  public fetchData(client: HttpClient, queryKey: string, variables?: object, cachingType?: CachingTypes): Promise<any> {
    return client.post({
      query: this.props.graphqlDocument.body,
      variables
    }).then((response: any) => {
      this.fetchedFromServer = true;

      if (cachingType !== CachingTypes.NoCache) {
        this.props.setQueryResult({
          queryKey,
          result: response.data
        });
      } else {
        this.setState({
          noCacheQueryResult: response.data
        });
      }

      return response.data;
    }).catch((error: AxiosError) => {
      if (error.response) {
        this.fetchedFromServer = true;

        if (cachingType !== CachingTypes.NoCache) {
          this.props.setQueryResult({
            queryKey,
            result: {
              data: undefined,
              errors: error.response.data
            }
          });
        } else {
          this.setState({
            noCacheQueryResult: {
              data: undefined,
              errors: error.response.data
            }
          });
        }

        return {
          data: undefined,
          errors: error.response.data
        };
      } else {
        throw error;
      }
    });
  }

  public getQueryKey(variables?: object): string {
    const {
      graphqlDocument
    } = this.props;

    return graphqlDocument.name + (variables ? JSON.stringify(variables) : '');
  }

  public replacePropertyValue(prevVal: any, newVal: any, object: any) {
    const newObject = clone(object);

    each(object, (val, key) => {
      console.log(val, key);
      if (typeof(val) === 'object') {
        newObject[key] = this.replacePropertyValue(prevVal, newVal, val);
      }
    });

    return newObject;
  }

  render(): ReactNode {
    const { noCacheQueryResult } = this.state;
    const {
      graphqlDocument,
      options: {
        variables,
        cachingType,
        executeOnMount
      },
      queryResults
    } = this.props;

    const queryKey: string = this.getQueryKey(variables);
    const queryResponse: any = {};

    if ((
        (cachingType !== CachingTypes.NetworkOnly) &&
        (cachingType !== CachingTypes.NoCache)
      ) || ((
          (cachingType === CachingTypes.NetworkOnly) ||
          (cachingType === CachingTypes.NoCache)
        ) && this.fetchedFromServer
      )
    ) {
      if (cachingType === CachingTypes.NoCache) {
        queryResponse[graphqlDocument.name] = noCacheQueryResult;
        queryResponse[graphqlDocument.name].fetchQuery = this.fetchQuery;
      } else {
        queryResponse[graphqlDocument.name] = queryResults[queryKey] ? { ...queryResults[queryKey] } : { data: undefined };
        queryResponse[graphqlDocument.name].fetchQuery = this.fetchQuery;
      }
    } else {
      queryResponse[graphqlDocument.name] = { data: undefined };
      queryResponse[graphqlDocument.name].fetchQuery = this.fetchQuery;
    }

    console.log('aaaaaa', this.replacePropertyValue(1,3, queryResults));

    console.log('asd');
    return this.props.children(queryResponse);
  }
}

function mapStateToProps(state: IReduxState): IQueryContainerReduxStateProps {
  return {
    queryResults: state.queryReducer.results
  };
}

/**
 * @param dispatch
 */
function mapDispatchToProps(dispatch: Dispatch): IQueryContainerReduxDispatchProps {
  return {
    setQueryResult: (result: any) => dispatch(setQueryResult(result))
  };
}

export default connect<IQueryContainerReduxStateProps, IQueryContainerReduxDispatchProps, IQueryContainerProps, IReduxState>(
  mapStateToProps,
  mapDispatchToProps
)(QueryContainer);
