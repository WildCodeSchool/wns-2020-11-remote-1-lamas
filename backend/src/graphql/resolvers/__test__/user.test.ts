import { createTestClient } from 'apollo-server-testing';
import { gql } from 'apollo-server';
import serverApollo from '../../../test/graphQlServerTest';

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

const FIND_USER = gql`
  query($userId: ID!) {
    getUser(_id: $userId) {
      _id
      firstname
      lastname
      email
    }
  }
`;

describe('user test', () => {
  it('create a new user', async (done) => {
    const { mutate, query } = await global.signin();

    const res = await mutate({
      mutation: CREATE_USER,
      variables: {
        firstname: 'Auguste',
        lastname: 'Patoune',
        email: 'patoune@hotmail.fr',
        password: 'M!dpsuper@72320',
      },
    });

    // console.log(res.errors[0].extensions.exception);
    // console.log(res);
    expect(res.data).toHaveProperty('createUser');
    expect(typeof res.data.createUser).toBe('object');
    expect(res.data.createUser).toHaveProperty('_id');
    expect(res.data.createUser).toHaveProperty('firstname', 'Auguste');
    expect(res.data.createUser).toHaveProperty('lastname', 'Patoune');
    expect(res.data.createUser).toHaveProperty('email', 'patoune@hotmail.fr');
    expect(res.data.createUser).toHaveProperty('password');
    done();
  });

  it('get user', async (done) => {
    const { mutate, query } = await global.signin();

    const user = await mutate({
      mutation: CREATE_USER,
      variables: {
        firstname: 'Auguste',
        lastname: 'Patoune',
        email: 'patoune@hotmail.fr',
        password: 'M!dpsuper@72320',
      },
    });

    const userId = user.data.createUser._id;

    const res = await query({
      query: FIND_USER,
      variables: { userId },
    });

    // console.log(res.errors[0].extensions.exception);
    expect(res.data).toHaveProperty('getUser');
    expect(typeof res.data.getUser).toBe('object');
    expect(res.data.getUser).toHaveProperty('_id');
    expect(res.data.getUser).toHaveProperty('firstname', 'Auguste');
    expect(res.data.getUser).toHaveProperty('lastname', 'Patoune');
    expect(res.data.getUser).toHaveProperty('email', 'patoune@hotmail.fr');
    done();
  });
});
