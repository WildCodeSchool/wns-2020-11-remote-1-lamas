import mongoose from 'mongoose';
import mongodbStart from '../database/db';

beforeAll(async () => {
  await mongodbStart();
});

afterAll(async () => {
  await mongoose.connection.close();
});
