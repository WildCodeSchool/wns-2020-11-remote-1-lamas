import { gql } from '@apollo/client';

export const SET_COOKIE = gql`
  mutation($_id: ID!) {
    setCookie(_id: $_id)
  }
`;

export const REMOVE_COOKIE = gql`
  mutation {
    removeCookie
  }
`;
