import { gql } from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export const FIND_USER = gql`
  query($userId: String!) {
    getUser(_id: $userId) {
      _id
      firstname
      lastname
      email
    }
  }
`;
