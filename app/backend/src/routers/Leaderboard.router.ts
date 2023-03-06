import { Router } from 'express';
import LeaderboardController from '../controllers/BoardController';

const BoardRouter = Router();

const boardController = new LeaderboardController();

BoardRouter.get('/home', (req, res) => boardController.getHomeInfo(req, res));

export default BoardRouter;
