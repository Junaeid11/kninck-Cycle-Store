import jwt from 'jsonwebtoken';

export const createToken = (
  JwtPayload: { email: string; role: string },
  secret: jwt.Secret,
  expiresIn: string,
) => {
  return jwt.sign(JwtPayload, secret, {expiresIn});
};
