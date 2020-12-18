import { addUser, getUserCount, IncrementEmojis, getMoodCounter, removeUser } from './user';
import Organizations from './database/models/Organization'
import { createTestClient } from 'apollo-server-testing';
import { ApolloServer, gql, makeExecutableSchema } from 'apollo-server';
import { OrganizationType } from "./graphql/typeDef"
import { organizationResolver } from './graphql/resolvers'

const schema = makeExecutableSchema({
    typeDefs:[OrganizationType],
    resolvers:[organizationResolver],
  });

const server = new ApolloServer({ schema });


const FIND_ORGANIZATION = gql`
query($_id:ID!) {
    getOrganization(_id: $_id) {
        organization_name
    }
}
`;


const CREATE_ORGANIZATION = gql`
mutation($organization_name:String) {
    getOrganization(organization_name: $organization_name) {
        organization_name
    }
}
`;

test("create organization", async () => {
    const { query, mutate } = createTestClient(server);

    const res = await mutate({ mutation: CREATE_ORGANIZATION, variables: {organization_name: "saluuuuuuut" }})
    // expect(res).toEqual({
    //     data: {
    //         getOrganization: {
    //             organization_name: 'hellooooo'
    //         }
    //     }
    // });
  
  console.log('RES DATA CREATION', res.data)
  });

test("get organization", async () => {
    const { query, mutate } = createTestClient(server);

    const res = await query({ query: FIND_ORGANIZATION, variables: {_id: "5fdbf69849792c27dcadfa75" }})
    expect(res).toEqual({
        data: {
            getOrganization: {
                organization_name: 'saluuuuuuut'
            }
        }
    });
  
  console.log('RES DATA', res.data)
  });

// describe('createOrganization', () => {
//     describe('when passed an id', () => {
//         it('return organization_name', async () => {
//             const res = await organizationResolver.Query.getOrganization(_, "5fdbf69849792c27dcadfa75")
//             expect(res).toEqual({
//                 data: {
//                     getOrganization: {
//                       organization_name: "hellooooo"
//                     }
//                   }  
//             })
//         })
//     })
// })

// describe('getOrganization', () => {
//     describe('when passed an id', () => {
//         it('return organization_name', async () => {
//             // create organization
//             const res = await organizationResolver.Query.getOrganization(_, "5fdbf69849792c27dcadfa75")
//             expect(res).toEqual({
//                 data: {
//                     getOrganization: {
//                       organization_name: "hellooooo"
//                     }
//                   }  
//             })
//         })
//     })
// })