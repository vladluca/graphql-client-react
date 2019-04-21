import gql from 'graphql-tag';
import { DocumentNode } from 'graphql';

export const UPDATE_USER_MUTATION: DocumentNode = gql`
    mutation updateUserMutation($id: ID!, $firstName: String!) {
        updateUser(id: $id, firstName: $firstName) {
            id
            firstName
            lastName
            email
            avatar
        }
    }
`;

export const LOGIN_MUTATION: DocumentNode = gql`
    mutation loginMutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
        }
    }
`;
