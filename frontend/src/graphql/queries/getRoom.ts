import { gql } from '@apollo/client';

export const GET_ROOM = gql`
  query ($roomId: ID!) {
    getRoom(_id: $roomId) {
      _id
      name
      owner
    }
  }
`;
