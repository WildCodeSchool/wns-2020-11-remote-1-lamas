import { gql } from 'apollo-server';

const RoomType = gql`
  type Room {
    _id: ID!
    name: String!
    owner: ID!
  }

  type Query {
    getRoom(_id: ID!): Room
    getRooms: [Room]
  }

  type Mutation {
    createRoom(name: String): Room
  }
`;

export default RoomType;
