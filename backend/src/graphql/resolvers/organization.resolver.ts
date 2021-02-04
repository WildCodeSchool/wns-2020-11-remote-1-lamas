import validator from 'validator';
import Organizations, {
  IOrganization,
} from '../../database/models/Organization';

import InputError from '../../errors/InputError';
import NotFoundError from '../../errors/NotFoundError';

export default {
  Query: {
    async getOrganization(
      _: void,
      organizationId: any
    ): Promise<IOrganization> {
      const errors: string[] = [];
      if (validator.isEmpty(organizationId._id)) {
        errors.push('missing Id input');
      }

      if (errors.length) {
        throw new InputError(errors);
      }

      const organization = await Organizations.findById(organizationId);

      if (!organization) {
        throw new NotFoundError();
      }

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
