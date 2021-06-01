import { gql } from '@apollo/client';

<<<<<<< HEAD
=======
// eslint-disable-next-line
>>>>>>> 4092e4205357b1bd86ffb7b022b3524aa03ed16d
export const FIND_USER = gql`
  query($userId: ID!) {
    getUser(_id: $userId) {
      _id
      firstname
      lastname
      email
    }
  }
`;
