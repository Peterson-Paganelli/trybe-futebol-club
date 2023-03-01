import { Router } from 'express';
import TeamsController from '../controllers/TeamsController';

const TeamsRouter = Router();

const teamsController = new TeamsController();

TeamsRouter.get('/', (req, res) => teamsController.getAllTeams(req, res));
TeamsRouter.get('/:id', (req, res) => teamsController.getTeamById(req, res));

export default TeamsRouter;
