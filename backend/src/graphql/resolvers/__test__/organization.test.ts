import { createTestClient } from 'apollo-server-testing';
import { gql } from 'apollo-server';
import serverApollo from '../../graphqlServer';

const FIND_ORGANIZATION = gql`
  query($organizationId: ID!) {
    getOrganization(_id: $organizationId) {
      _id
      organization_name
    }
  }
`;

const CREATE_ORGANIZATION = gql`
  mutation($organization_name: String) {
    createOrganization(organization_name: $organization_name) {
      _id
      organization_name
    }
  }
`;

const { mutate, query } = createTestClient(serverApollo);

describe('organization test', () => {
  it('create organization', async (done) => {
    const res = await mutate({
      mutation: CREATE_ORGANIZATION,
      variables: { organization_name: 'testing' },
    });

    expect(res.data).toHaveProperty('createOrganization');
    expect(typeof res.data.createOrganization).toBe('object');
    expect(res.data.createOrganization).toHaveProperty('_id');
    expect(res.data.createOrganization).toHaveProperty(
      'organization_name',
      'testing'
    );

    done();
  });

  it('get organization', async (done) => {
    const organization = await mutate({
      mutation: CREATE_ORGANIZATION,
      variables: { organization_name: 'testing' },
    });

    const organizationId = organization.data.createOrganization._id;

    const res = await query({
      query: FIND_ORGANIZATION,
      variables: { organizationId },
    });

    expect(res.data).toHaveProperty('getOrganization');
    expect(typeof res.data.getOrganization).toBe('object');
    expect(res.data.getOrganization).toHaveProperty('_id');
    expect(res.data.getOrganization).toHaveProperty(
      'organization_name',
      'testing'
    );
    done();
  });
});
