import { verify } from 'jsonwebtoken'
import { AppError } from '../app/config/global.js'
import { jwt_secret } from '../app/config/auth.js'

export const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AppError("JWT token is missing", 401);
  }

  // Token Bearer
  const [, token] = authorization.split(" ");

  try {
    const decodedToken = verify(token, jwt_secret);
    const { sub } = decodedToken;

    req.user_access = sub;
    next()

  } catch {
    throw new AppError("Invalid JWT token", 401);
  }
}
