import { gql } from 'apollo-server';

const OrganizationType = gql`
  type Organization {
    _id: ID!
    organization_name: String!
  }

  type Query {
    getOrganization(_id: ID!): Organization
  }

  type Mutation {
    createOrganization(organization_name: String): Organization
  }
`;

export default OrganizationType;
