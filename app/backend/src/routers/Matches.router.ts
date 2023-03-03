import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';

const MatchesRouter = Router();

const matchesController = new MatchesController();

MatchesRouter.get('/', (req, res) => matchesController.getAllMatches(req, res));
MatchesRouter.patch('/:id/finish', (req, res) => matchesController.finishMatch(req, res));

export default MatchesRouter;
