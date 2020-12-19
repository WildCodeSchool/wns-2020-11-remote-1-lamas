import { createTestClient } from 'apollo-server-testing';
import { gql } from 'apollo-server';
import serverApollo from './graphql/graphqlServer'

const FIND_ORGANIZATION = gql`
query($_id:ID!) {
    getOrganization(_id: $_id) {
        organization_name
    }
}
`;

const CREATE_ORGANIZATION = gql`
mutation($organization_name:String) {
    createOrganization(organization_name: $organization_name) {
        _id,
        organization_name
    }
}
`;

let id = ''

test("create organization", async () => {
    const { query, mutate } = createTestClient(serverApollo);

    const res = await mutate({ mutation: CREATE_ORGANIZATION, variables: {organization_name: "testing" }})
  
    // expect(res).toEqual({
    //     data: {
    //         getOrganization: {
    //             organization_name: 'hellooooo'
    //         }
    //     }
    // });
  
  console.log('RES DATA CREATION', res.data.createOrganization._id)
  });

  

// test("get organization", async () => {
//     const { query, mutate } = createTestClient(server);

// const resfind = await query({ query: FIND_ORGANIZATION, variables: {_id:  "5fdca9ddd3b3ca26d625d155"}})

// console.log('RES DATA GET', resfind.data.getOrganization)

// //     const res = await query({ query: FIND_ORGANIZATION, variables: {_id: "5fdbf69849792c27dcadfa75" }})
// //     expect(res).toEqual({
// //         data: {
// //             getOrganization: {
// //                 organization_name: 'saluuuuuuut'
// //             }
// //         }
// //     });
  
// //   console.log('RES DATA', res.data)
//   });

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