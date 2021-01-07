import mongoose from 'mongoose';
import * as dotenv from "dotenv";

dotenv.config();

const dbUrl = process.env.NODE_ENV !=='test' ? process.env.MONGODB_URI : process.env.MONGODB_URI_TESTING;

console.log('NODE_ENV', process.env.NODE_ENV, 'process.env', process.env  )

const MongoDB_start = async () => {
  try {
    // Database
    await mongoose.connect(`/`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      autoIndex: true,
    });
    // eslint-disable-next-line no-console
    console.log(`Connected to database`);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
};

export default MongoDB_start
