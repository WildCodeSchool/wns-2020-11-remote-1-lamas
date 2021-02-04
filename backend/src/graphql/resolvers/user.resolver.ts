import validator from 'validator';
import { Types } from 'mongoose';
import Users, { IUser } from '../../database/models/User';

import InputError from '../../errors/InputError';
import NotFoundError from '../../errors/NotFoundError';

type ID = Types.ObjectId;

interface IUserData {
  _id: ID;
  firstname: string;
  lastname: string;
  role?: string;
  email: string;
  password: string;
  room_list?: ID[];
  todos_list?: ID[];
  organization_id?: ID[];
}

export default {
  //   Query: {
  //     async getOrganization(
  //       _: void,
  //       organizationId: any
  //     ): Promise<IOrganization> {
  //       const errors: string[] = [];
  //       if (validator.isEmpty(organizationId._id)) {
  //         errors.push('missing Id input');
  //       }

  //       if (errors.length) {
  //         throw new InputError(errors);
  //       }

  //       const organization = await Organizations.findById(organizationId);

  //       if (!organization) {
  //         throw new NotFoundError();
  //       }

  //       return organization;
  //     },
  //   },
  Mutation: {
    async createUser(_: void, data: IUserData): Promise<IUser> {
      const user = new Users(data);
      await user.save();
      return user;
    },
  },
};
