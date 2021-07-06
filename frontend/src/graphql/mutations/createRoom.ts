import { gql } from '@apollo/client';

export const CREATE_ROOM = gql`
  mutation ($name: String) {
    createRoom(name: $name) {
      _id
      name
      owner
    }
  }
`;
