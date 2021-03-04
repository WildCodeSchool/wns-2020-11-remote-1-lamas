import { Types } from 'mongoose';
import { IUser } from '../../../database/models/User';

type ID = Types.ObjectId;

export interface IcreateUserData {
  id?: string;
  firstname: string;
  lastname: string;
  role?: string;
  email: string;
  password: string;
  room_list?: ID[];
  todos_list?: ID[];
  organization_id?: ID[];
}

export interface IgetUserData {
  _id: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface UserWithToken {
  token: string;
  user: IUser;
}

export interface Icontext {
  user: Partial<IcreateUserData>;
  _extensionStack: unknown;
}
