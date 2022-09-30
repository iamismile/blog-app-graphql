import { promisify } from 'util';
import JWT from 'jsonwebtoken';
import { JWT_SIGNATURE } from '../keys';

const promisifyJWTVerify = promisify(JWT.verify);

export const getUserFromToken = async (token: string) => {
  try {
    return (await promisifyJWTVerify(token, JWT_SIGNATURE)) as { userId: number };
  } catch (err) {
    return null;
  }
};
