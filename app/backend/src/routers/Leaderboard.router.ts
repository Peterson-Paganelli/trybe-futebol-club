import { Router } from 'express';
import LeaderboardController from '../controllers/BoardController';

const BoardRouter = Router();

const boardController = new LeaderboardController();

BoardRouter.get('/', (req, res) => boardController.getAllInfo(req, res));
BoardRouter.get('/home', (req, res) => boardController.getHomeInfo(req, res));
BoardRouter.get('/away', (req, res) => boardController.getAwayInfo(req, res));
export default BoardRouter;
