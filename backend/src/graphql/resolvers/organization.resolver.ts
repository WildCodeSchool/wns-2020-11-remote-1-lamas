import Organizations, {
  IOrganization,
} from '../../database/models/Organization';

export default {
  Query: {
    async getOrganization(
      _: void,
      organizationId: string
    ): Promise<IOrganization> {
      const organization = await Organizations.findById(organizationId);
      return organization;
    },
  },
  Mutation: {
    async createOrganization(
      _: void,
      organizationName: string
    ): Promise<IOrganization> {
      const organization = new Organizations(organizationName);
      await organization.save();
      return organization;
    },
  },
};
