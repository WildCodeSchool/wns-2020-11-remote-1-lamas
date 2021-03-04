/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-namespace */
import { createTestClient } from 'apollo-server-testing';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import createApolloServer from './graphQlServerTest';
import Users from '../database/models/User';

declare global {
  namespace NodeJS {
    interface Global {
      signin(): Promise<any>;
    }
  }
}

let mongo: any;
beforeAll(async () => {
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  // eslint-disable-next-line no-restricted-syntax
  for (const collection of collections) {
    // eslint-disable-next-line no-await-in-loop
    await collection.deleteMany({});
  }

  global.signin = async () => {
    const user = new Users({
      firstname: 'test firstname',
      lastname: 'test lastname',
      email: 'pa@hmail.fr',
      password: 'M!dpsuper@72320',
    });

    const testUser = await user.save();

    const { mutate, query } = createTestClient(createApolloServer(testUser));

    return { query, mutate, testUser };
  };
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});
