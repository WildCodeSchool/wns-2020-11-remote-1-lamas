import { gql } from 'apollo-server';

const UserType = gql`
  scalar DateTime

  type User {
    _id: ID!
    firstname: String
    lastname: String
    email: String
    password: String
    todos_list: ID
  }

  type UserWithToken {
    token: String
    user: User
  }

  type UserConnected {
    _id: ID
    firstname: String
    lastname: String
  }

  type Query {
    getUser(_id: ID!): User
    getUserConnected: UserConnected!
  }

  type Mutation {
    loginUser(email: String, password: String): UserWithToken
    createUser(
      firstname: String
      lastname: String
      email: String
      password: String
    ): UserWithToken
  }
`;

export default UserType;
