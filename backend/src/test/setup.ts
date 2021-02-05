import { gql } from 'apollo-server';
import { createTestClient } from 'apollo-server-testing';
import mongoose from 'mongoose';
import mongodbStart from '../database/db';
import createApolloServer from './graphQlServerTest';

import Users, { IUser } from '../database/models/User';

declare global {
  namespace NodeJS {
    interface Global {
      signin(): Promise<any>;
    }
  }
}

const CREATE_USER = gql`
  mutation(
    $firstname: String
    $lastname: String
    $email: String
    $password: String
  ) {
    createUser(
      firstname: $firstname
      lastname: $lastname
      email: $email
      password: $password
    ) {
      _id
      firstname
      lastname
      email
      password
    }
  }
`;

beforeAll(async () => {
  await mongodbStart();
});

beforeEach(async () => {
  global.signin = async () => {
    const user = new Users({
      firstname: 'test firstname',
      lastname: 'test lastname',
      email: 'pate@hmail.fr',
      password: 'M!dpsuper@72320',
    });

    //601c271c21aa07e2195fc45c

    const testUser = await user.save();

    const { mutate, query } = createTestClient(createApolloServer(testUser));

    return { query, mutate, testUser };
  };
});

afterEach(async () => {
  const collections = await mongoose.connection.db.collections();

  // eslint-disable-next-line no-restricted-syntax
  for (const collection of collections) {
    // eslint-disable-next-line no-await-in-loop
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});
