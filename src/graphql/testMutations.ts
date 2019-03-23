import gql from 'graphql-tag';
import { DocumentNode } from 'graphql';

export const MEMBER_SIGN_UP_MUTATION: DocumentNode = gql`
    mutation MemberSignUpMutation($accountInformation: MemberSignUpInput!) {
        memberSignUp(
            input: $accountInformation
        )
    }
`;
