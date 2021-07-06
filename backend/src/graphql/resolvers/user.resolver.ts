import validator from 'validator';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Users, { IUser } from '../../database/models/User';

import InputError from '../../errors/InputError';
import NotFoundError from '../../errors/NotFoundError';
import createToken from '../utils/createToken';
import BadRequestError from '../../errors/BadRequestError';
import UnauthorizedError from '../../errors/UnauthorizedError';
import CreationError from '../../errors/CreationError';
import {
  Icontext,
  IcreateUserData,
  IgetUserData,
  UserWithToken,
  ILoginUser,
} from './types/user.type';

const maxAge = 365 * 24 * 60 * 60 * 1000;

interface ICookie {
  _id: string;
}

export default {
  Query: {
    async getUser(
      _: void,
      data: IgetUserData,
      context: Icontext
    ): Promise<IUser> {
      if (!context.user.id) throw new UnauthorizedError();
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
    async getUserConnected(
      _: void,
      _data: null,
      context: Icontext
    ): Promise<Partial<IUser>> {
      if (!context?.user?.id) throw new UnauthorizedError();
      const user: IUser | null = await Users.findById(context.user.id, {
        _id: 1,
        firstname: 1,
        lastname: 1,
      });

      if (!user) {
        throw new NotFoundError();
      }

      return user;
    },
  },
  Mutation: {
    async createUser(_: void, data: IcreateUserData): Promise<UserWithToken> {
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
        await user.save();

        const token = createToken({ id: user._id });

        const result = {
          token,
          user,
        };

        return result;
      }
      throw new CreationError();
    },
    async loginUser(_: void, data: ILoginUser): Promise<UserWithToken> {
      const errors: string[] = [];

      if (errors.length) {
        throw new InputError(errors);
      }

      const { email, password } = data;

      const findUserPerEmail = await Users.findOne({ email });

      if (!findUserPerEmail) {
        throw new NotFoundError();
      }

      const auth = await bcrypt.compare(password, findUserPerEmail?.password);

      if (!auth) {
        throw new Error();
      }

      const token = createToken({ id: findUserPerEmail._id });

      return { token, user: findUserPerEmail };
    },
    async setCookie(
      _: void,
      data: ICookie,
      context: Icontext
    ): Promise<string> {
      const user: IUser | null = await Users.findById(data._id, {
        _id: 1,
        firstname: 1,
        lastname: 1,
      });

      context.res.cookie('user', JSON.stringify(user || '{}'), {
        httpOnly: process.env.NODE_ENV === 'production',
        secure: process.env.NODE_ENV === 'production',
        maxAge,
      });

      return data._id;
    },
    async removeCookie(
      _: void,
      data: ILoginUser,
      context: Icontext
    ): Promise<string> {
      context.res.cookie('user', '', {
        httpOnly: process.env.NODE_ENV === 'production',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 0,
      });

      return 'SUCCESS';
    },
  },
};
