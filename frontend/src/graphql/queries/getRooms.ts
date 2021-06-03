import { gql } from '@apollo/client';

export const GET_ROOMS = gql`
  query {
    getRooms {
      _id
      name
      owner
    }
  }
`;
