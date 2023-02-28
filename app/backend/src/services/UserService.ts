import { compare } from 'bcryptjs';
import { generateToken } from '../auth/jwt';
import Login from '../interfaces/Login.interface';
import Users from '../database/models/Users';

class UserService {
  public postLogin = async (payload: Login) => {
    const { email } = payload;
    const user = await Users.findOne({ where: { email } });
    if (!user || !(await compare(payload.password, user.password))) {
      return { status: 401, response: { message: 'Incorrect email or password' } };
    }
    const token = generateToken({ user });
    return { status: 200, response: { token } };
  };
}
export default UserService;
