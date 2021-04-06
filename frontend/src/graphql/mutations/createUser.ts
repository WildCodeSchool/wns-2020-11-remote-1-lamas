import { gql } from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
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

// const SIGNUP_MUTATION = gql`
//   mutation SignupMutation(
//     $email: String!
//     $password: String!
//     $name: String!
//   ) {
//     signup(
//       email: $email
//       password: $password
//       name: $name
//     ) {
//       token
//     }
//   }
// `;
