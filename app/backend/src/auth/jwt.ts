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

const validateToken = (token: string) => {
  try {
    const validation = jwt.verify(token, password);
    return validation as jwt.JwtPayload;
  } catch (error) {
    return null;
  }
};

export { generateToken, validateToken };
