import { gql } from 'apollo-server';

const RoomType = gql`
  type Room {
    _id: ID!
    room_name: String!
  }

  type Query {
    getRoom(_id: ID!): Room
  }

  type Mutation {
    createRoom(room_name: String): Room
  }
`;

export default RoomType;
