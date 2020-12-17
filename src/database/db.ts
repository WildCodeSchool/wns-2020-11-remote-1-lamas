import mongoose from 'mongoose';
import * as dotenv from "dotenv";

dotenv.config();

const dbUrl = process.env.MONGODB_URI;

const start = async () => {
  try {
    // Database

    await mongoose.connect(`${dbUrl}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      autoIndex: true,
    });
    // eslint-disable-next-line no-console
    console.log('Connected to database');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
};

export default start
