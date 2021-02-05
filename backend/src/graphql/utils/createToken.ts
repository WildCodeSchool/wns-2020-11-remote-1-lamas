import jwt, { Secret } from 'jsonwebtoken';
import { Types } from 'mongoose';
const jwtsecret = process.env.JWT_SECRET as Secret;
const expiration = 365 * 24 * 60 * 60 * 1000;

type ID = Types.ObjectId;

const createToken = ({
  context,
  id,
  maxAge = expiration,
}: {
  context: any;
  id: ID;
  maxAge?: number;
}) => {
  const token = jwt.sign({ id }, jwtsecret, {
    expiresIn: maxAge,
  });

  // context?.res?.cookie('jwt', token, {
  //   httpOnly: process.env.NODE_ENV === 'production',
  //   secure: process.env.NODE_ENV === 'production',
  //   maxAge,
  // });

  return token;
};

export default createToken;
