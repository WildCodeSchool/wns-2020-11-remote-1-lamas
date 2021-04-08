import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation($email: String, $password: String) {
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
