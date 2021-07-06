import { gql } from '@apollo/client';

const CREATE_USER = gql`
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
      token
      user {
        _id
        firstname
        lastname
        email
        password
      }
    }
  }
`;

export default CREATE_USER;
