import { gql } from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        firstname
        lastname
        email
      }
    }
  }
`;
