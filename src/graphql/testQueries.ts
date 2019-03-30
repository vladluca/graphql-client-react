import gql from 'graphql-tag';

import { DocumentNode } from 'graphql';

export const ALL_USERS_QUERY: DocumentNode = gql`
    query allUsersQuery{
        allUsers {
            id
            firstName
            lastName
            email
            avatar
        }
    }
`;

export const GET_USER_QUERY: DocumentNode = gql`
    query getUser($id: ID!) {
        User(id: $id) {
            id
            firstName
            lastName
            email
            avatar
        }
    }
`;
