import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';

const MatchesRouter = Router();

const matchesController = new MatchesController();

MatchesRouter.get('/', (req, res) => matchesController.getAllMatches(req, res));

export default MatchesRouter;
