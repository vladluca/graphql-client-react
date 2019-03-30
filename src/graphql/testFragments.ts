import gql from 'graphql-tag';
import { DocumentNode } from 'graphql';

export const ACCOUNT_PROFILE_PICTURE: DocumentNode = gql`
    fragment accountProfilePicture on AccountDetails {
        avatar {
            approvalStatus
            thumbUrl
            smallUrl
            coverSmallUrl
            coverLargeUrl
        }
    }
`;
