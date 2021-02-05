import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation(
    $firstname: String
    $lastname: String
    $email: String
    $password: String
  ) {
    createUser(
      firstname: $firstname
      lastname: $lastname
      email: $email
      password: $password
    ) {
      _id
      firstname
      lastname
      email
      password
    }
  }
`;
