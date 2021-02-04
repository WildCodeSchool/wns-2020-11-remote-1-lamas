import { gql } from 'apollo-server';

const UserType = gql`
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

  type Query {
    getUser(_id: ID!): User
  }

  type Mutation {
    createUser(
      firstname: String
      lastname: String
      email: String
      password: String
    ): User
  }
`;

export default UserType;
