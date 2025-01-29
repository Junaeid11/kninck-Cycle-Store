/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';

export const createToken = (
  JwtPayload: { email: string; role: string },
  secret: jwt.Secret,
  expiresIn: any,
) => {
  return jwt.sign(JwtPayload, secret, {expiresIn});
};
