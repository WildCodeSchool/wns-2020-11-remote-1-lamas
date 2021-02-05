import jwt, { Secret } from 'jsonwebtoken';
import validator from 'validator';
import UnauthorizedError from '../../errors/UnauthorizedError';
import * as dotenv from 'dotenv';

dotenv.config();
const jwtsecret = process.env.JWT_SECRET as Secret;

const verifyToken = (token: string) => {
  if (validator.isJWT(token)) {
    console.log(token);

    return jwt.verify(token, jwtsecret);
  }
  return null;
};

export default verifyToken;
