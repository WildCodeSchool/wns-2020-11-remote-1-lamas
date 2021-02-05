import validator from 'validator';
import mongoose, { Types } from 'mongoose';
import Users, { IUser } from '../../database/models/User';

import InputError from '../../errors/InputError';
import NotFoundError from '../../errors/NotFoundError';
import createToken from '../utils/createToken';
import BadRequestError from '../../errors/BadRequestError';
import UnauthorizedError from '../../errors/UnauthorizedError';

type ID = Types.ObjectId;

interface IcreateUserData {
  firstname: string;
  lastname: string;
  role?: string;
  email: string;
  password: string;
  room_list?: ID[];
  todos_list?: ID[];
  organization_id?: ID[];
}

interface IgetUserData {
  _id: ID;
}

export default {
  Query: {
    async getUser(_: void, data: IgetUserData, context: any): Promise<IUser> {
      if (!context.user._id) throw new UnauthorizedError();
      const errors: string[] = [];
      if (!mongoose.Types.ObjectId.isValid(data._id)) {
        errors.push('missing Id input');
      }

      if (errors.length) {
        throw new InputError(errors);
      }

      const user = await Users.findById(data);

      if (!user) {
        throw new NotFoundError();
      }

      return user;
    },
  },
  Mutation: {
    async createUser(
      _: void,
      data: IcreateUserData,
      context: any
    ): Promise<IUser> {
      console.log(data);
      const errors = [];
      const { firstname, lastname, email, password } = data;
      if (validator.isEmpty(firstname)) {
        errors.push('missing firstname input');
      }

      if (validator.isEmpty(lastname)) {
        errors.push('missing firstname input');
      }

      if (validator.isEmpty(email)) {
        errors.push('missing email input');
      }

      if (!validator.isEmail(email)) {
        errors.push('email is not correct');
      }

      if (validator.isEmpty(password)) {
        errors.push('missing password input');
      }

      if (!validator.isStrongPassword(password)) {
        errors.push('Password format is not correct');
      }

      const userWithSameEmail = await Users.findOne({
        email,
      });

      if (userWithSameEmail) {
        throw new BadRequestError([
          `A user with the email ${email} already exists`,
        ]);
      }

      if (errors.length) {
        throw new InputError(errors);
      }

      const user = new Users(data);

      if (user) {
        createToken({ context, id: user._id });
      }

      await user.save();
      return user;
    },
  },
};
