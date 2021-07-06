import { Types } from 'mongoose';
import express from 'express';
import { IUser } from '../../../database/models/User';

type ID = Types.ObjectId;

export interface IcreateUserData {
  id?: ID;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  todos_list?: ID[];
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
  req: express.Request;
  res: express.Response;
}
