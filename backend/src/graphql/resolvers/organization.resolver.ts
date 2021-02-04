import validator from 'validator';
import mongoose, { Types } from 'mongoose';
import Organizations, {
  IOrganization,
} from '../../database/models/Organization';

import InputError from '../../errors/InputError';
import NotFoundError from '../../errors/NotFoundError';

type ID = Types.ObjectId;

interface IOrganisationData {
  _id: ID;
}

export default {
  Query: {
    async getOrganization(
      _: void,
      data: IOrganisationData
    ): Promise<IOrganization> {
      const errors: string[] = [];
      if (validator.isEmpty(data._id)) {
        errors.push('missing Id input');
      }

      if (errors.length) {
        throw new InputError(errors);
      }

      const organization = await Organizations.findById(data);

      if (!organization) {
        throw new NotFoundError();
      }

      return organization;
    },
  },
  Mutation: {
    async createOrganization(_: void, data: string): Promise<IOrganization> {
      const organization = new Organizations(data);
      await organization.save();
      return organization;
    },
  },
};
