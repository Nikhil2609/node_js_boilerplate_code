import * as jwt from 'jsonwebtoken';
import { TOKEN_EXPRIATION_PERIOD } from './constant';
import { users } from '@prisma/client';

export const generateToken = (user: users) => {
  const token = jwt.sign(user, process.env.JWT_SECRET as string, {
    expiresIn: TOKEN_EXPRIATION_PERIOD
  });
  return token;
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};
