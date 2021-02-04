import jwt, { Secret } from 'jsonwebtoken';
import UnauthorizedError from '../../errors/UnauthorizedError';
const jwtsecret = process.env.JWT_SECRET as Secret;

const verifyToken = (token: string) => {
  if (token) {
    return jwt.verify(token, jwtsecret);
  }
  return null;
};

export default verifyToken;
