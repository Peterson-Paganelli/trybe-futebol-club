import { Router } from 'express';
import validateLogin from '../controllers/middlewares';
import UsersController from '../controllers/UsersController';

const LoginRouter = Router();

const usersController = new UsersController();

LoginRouter.post('/', validateLogin, (req, res) => usersController.postLogin(req, res));

export default LoginRouter;
