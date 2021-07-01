import { gql } from '@apollo/client';

export const GET_CONNECTED_USER = gql`
  query {
    getUserConnected {
      _id
      firstname
      lastname
    }
  }
`;
