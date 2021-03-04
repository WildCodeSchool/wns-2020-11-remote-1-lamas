import { gql } from 'apollo-server';

const UserType = gql`
  scalar DateTime

  type User {
    _id: ID!
    firstname: String
    lastname: String
    email: String
    password: String
    organization_id: ID
    room_list: ID
    todos_list: ID
  }

  type UserWithToken {
    token: String
    user: User
  }

  type Query {
    getUser(_id: ID!): User
    loginUser(email: String, password: String): UserWithToken
  }

  type Mutation {
    createUser(
      firstname: String
      lastname: String
      email: String
      password: String
    ): UserWithToken
  }
`;

export default UserType;