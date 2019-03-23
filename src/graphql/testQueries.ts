import gql from 'graphql-tag';

import { ACCOUNT_PROFILE_PICTURE } from './testFragments';
import { DocumentNode } from 'graphql';

export const ACCOUNT_LIVE_HOURS_QUERY: DocumentNode = gql`
  query accountLiveHoursQuery {
    myAccount {
      id
      liveHours
      allowedToMuteBasicMembers
    }
  }
`;

export const ACCOUNT_PROFILE_PICTURE_QUERY: DocumentNode = gql`
    query accountProfilePicture {
        myAccount {
            id
            accountDetails {
                ...accountProfilePicture
            }
        }
    }
    ${ACCOUNT_PROFILE_PICTURE}
`;

export const ALL_USERS_QUERY: DocumentNode = gql`
    query allUsersQuery{
        allUsers {
            id
            name
        }
    }
`;
