import { Request, Response } from 'express';

import UserService from '../services/UserService';

class UsersController {
  private _userService = new UserService();

  async postLogin(req: Request, res: Response) {
    const { status, response } = await this._userService.postLogin(req.body);
    return res.status(status).json(response);
  }
}

export default UsersController;
