import Organizations from '../../database/models/Organization';

// typegraphQL typegoose

export default {
  Query: {
    async getOrganization(_: any, organizationId: string) {
      const organization = await Organizations.findById(organizationId);

      return organization;
    },
  },
  Mutation: {
    async createOrganization(_: any, organizationName: string) {
      const organization: any = new Organizations(organizationName);
      await organization.save();

      return organization;
    },
  },
};
