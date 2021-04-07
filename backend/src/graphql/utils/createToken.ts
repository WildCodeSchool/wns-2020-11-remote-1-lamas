import jwt, { Secret } from 'jsonwebtoken';
import { Types } from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();
const jwtsecret = process.env.JWT_SECRET as Secret;
const expiration = 365 * 24 * 60 * 60 * 1000;

type ID = Types.ObjectId;

const createToken = ({
  id,
  maxAge = expiration,
}: {
  id: ID;
  maxAge?: number;
}): string => {
  console.log('id.toString()', id, typeof id);
  const token = jwt.sign({ id }, jwtsecret, {
    expiresIn: maxAge,
  });

  return token;
};

export default createToken;
