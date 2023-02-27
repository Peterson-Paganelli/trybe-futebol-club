import { Router } from 'express';
import TeamsController from '../controllers/TeamsController';

const router = Router();

const teamsController = new TeamsController();

router.get('/', (req, res) => teamsController.getAllTeams(req, res));

export default router;
