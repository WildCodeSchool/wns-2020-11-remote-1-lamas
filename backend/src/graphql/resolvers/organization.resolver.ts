/* eslint-disable @typescript-eslint/naming-convention */

import validator from 'validator';
import mongoose, { Types } from 'mongoose';
import Organizations, {
  IOrganization,
} from '../../database/models/Organization';

import InputError from '../../errors/InputError';
import NotFoundError from '../../errors/NotFoundError';
import CreationError from '../../errors/CreationError';
import UnauthorizedError from '../../errors/UnauthorizedError';
import { Icontext } from './types/user.type';

type ID = Types.ObjectId;

interface IgetOrganizationData {
  _id: ID;
}

interface IcreateOrganizationData {
  organization_name: string;
}

export default {
  Query: {
    async getOrganization(
      _: void,
      data: IgetOrganizationData,
      context: Icontext
    ): Promise<IOrganization> {
      if (!context.user.id) throw new UnauthorizedError();
      const { _id } = data;
      const errors: string[] = [];
      if (!mongoose.Types.ObjectId.isValid(_id)) {
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
    async createOrganization(
      _: void,
      data: IcreateOrganizationData,
      context: Icontext
    ): Promise<IOrganization> {
      if (!context.user.id) throw new UnauthorizedError();

      const { organization_name } = data;

      const errors = [];
      if (validator.isEmpty(organization_name)) {
        errors.push('missing organization_name input');
      }

      if (errors.length) {
        throw new InputError(errors);
      }

      const organization = new Organizations(data);

      if (!organization) {
        throw new CreationError(['issue with user creation']);
      }

      await organization.save();
      return organization;
    },
  },
};
