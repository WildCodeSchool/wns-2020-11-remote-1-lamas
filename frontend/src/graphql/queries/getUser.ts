import { gql } from '@apollo/client';

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
