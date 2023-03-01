import { compare } from 'bcryptjs';
import { generateToken, validateToken } from '../auth/jwt';
import Login from '../interfaces/Login.interface';
import Users from '../database/models/Users';

class UserService {
  public postLogin = async (payload: Login) => {
    const { email } = payload;

    const user = await Users.findOne({ where: { email } });
    if (!user) return { status: 401, response: { message: 'Invalid email or password' } };
    const password = await compare(payload.password, user.password);
    if (password) {
      const token = generateToken({ user });
      return { status: 200, response: { token } };
    }
    return { status: 401, response: { message: 'Invalid email or password' } };
  };

  public getRole = async (token: string | undefined) => {
    const payload = validateToken(token);
    if (payload.status) return { status: payload.status, response: { message: payload.response } };
    const { email } = payload.user;
    const user = await Users.findOne({ where: { email } });
    if (!user) return { status: 401, response: { message: 'Invalid email' } };
    const { role } = user;
    return { status: 200, response: { role } };
  };
}
export default UserService;
