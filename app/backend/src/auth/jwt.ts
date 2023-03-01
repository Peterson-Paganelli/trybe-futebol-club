import * as jwt from 'jsonwebtoken';

const password = process.env.JWT_SECRET || 'jwt_secret';

function generateToken(payload: object) {
  try {
    const token = jwt.sign(payload, password);
    return token;
  } catch (error) {
    throw new Error('TOKEN NOT WORKING!!!');
  }
}

const validateToken = (token: string | undefined) => {
  if (!token) return { status: 401, response: 'Token not found' };
  try {
    const payload = jwt.verify(token, password);
    return payload as jwt.JwtPayload;
  } catch (error) {
    return { status: 401, response: 'Token must be a valid token' };
  }
};

export { generateToken, validateToken };
