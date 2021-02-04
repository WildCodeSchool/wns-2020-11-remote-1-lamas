import mongoose from 'mongoose';
import mongodbStart from '../database/db';

async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  // eslint-disable-next-line no-restricted-syntax
  for (const collectionName of collections) {
    // eslint-disable-next-line no-await-in-loop
    await mongoose.connection.db.dropCollection(collectionName);
  }
}

beforeAll(async () => {
  await mongodbStart();
});

afterEach(async () => {
  await removeAllCollections();
});

afterAll(async () => {
  await mongoose.connection.close();
});
