import gql from 'graphql-tag';

import { ACCOUNT_PROFILE_PICTURE } from './testFragments';
import { DocumentNode } from 'graphql';

export const ALL_USERS_QUERY: DocumentNode = gql`
    query allUsersQuery{
        allUsers {
            id
            name
        }
    }
`;

export const GET_USER_QUERY: DocumentNode = gql`
    query getUser($email: String, $id: ID!) {
        User(email: $email, id: $id) {
            id
            name
        }
    }
`;