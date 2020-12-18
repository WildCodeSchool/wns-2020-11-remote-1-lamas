import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    messages(cursor: String, limit: Int): MessageConnection!
    Organization(id: ID!): Message!
  }
  extend type Mutation {
    addOrganization(organization_name: String!): ???
  }
  type Organization {
    id: ID!
    organization_name: String!
    class_id: [],
  }
`;