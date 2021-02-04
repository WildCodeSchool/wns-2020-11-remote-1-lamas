import mongoose from 'mongoose';
import mongodbStart from '../database/db';

beforeAll(async () => {
  await mongodbStart();
});

beforeEach(async () => {
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
