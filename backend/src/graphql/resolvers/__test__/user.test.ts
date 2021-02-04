import { createTestClient } from 'apollo-server-testing';
import { gql } from 'apollo-server';
import serverApollo from '../../graphqlServer';

// const FIND_ORGANIZATION = gql`
//   query($organizationId: ID!) {
//     getOrganization(_id: $organizationId) {
//       _id
//       organization_name
//     }
//   }
// `;

const CREATE_USER = gql`
  mutation(
    $firstname: String
    $lastname: String
    $email: String
    $password: String
  ) {
    createUser(
      firstname: $firstname
      lastname: $lastname
      email: $email
      password: $password
    ) {
      _id
      firstname
      lastname
      email
      password
    }
  }
`;

const { mutate, query } = createTestClient(serverApollo);

describe('user test', () => {
  it('create a new user', async (done) => {
    const res = await mutate({
      mutation: CREATE_USER,
      variables: {
        firstname: 'Auguste',
        lastname: 'Patoune',
        email: 'patoune@hotmail.fr',
        password: 'mdpsuper@72320',
      },
    });

    expect(res.data).toHaveProperty('createUser');
    expect(typeof res.data.createUser).toBe('object');
    expect(res.data.createUser).toHaveProperty('_id');
    expect(res.data.createUser).toHaveProperty('firstname', 'Auguste');
    expect(res.data.createUser).toHaveProperty('lastname', 'Patoune');
    expect(res.data.createUser).toHaveProperty('email', 'patoune@hotmail.fr');
    expect(res.data.createUser).toHaveProperty('password');
    done();
  });

  //   it('get organization', async (done) => {
  //     const organization = await mutate({
  //       mutation: CREATE_ORGANIZATION,
  //       variables: { organization_name: 'testing' },
  //     });

  //     const organizationId = organization.data.createOrganization._id;

  //     const res = await query({
  //       query: FIND_ORGANIZATION,
  //       variables: { organizationId },
  //     });

  //     // console.log(res.errors[0].extensions.exception);
  //     expect(res.data).toHaveProperty('getOrganization');
  //     expect(typeof res.data.getOrganization).toBe('object');
  //     expect(res.data.getOrganization).toHaveProperty('_id');
  //     expect(res.data.getOrganization).toHaveProperty(
  //       'organization_name',
  //       'testing'
  //     );
  //     done();
  //   });
});
