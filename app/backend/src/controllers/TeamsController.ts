import { Request, Response } from 'express';

import TeamService from '../services/TeamService';

class TeamsController {
  private _teamService = new TeamService();

  async getAllTeams(_req: Request, res: Response): Promise<void> {
    const { status, response } = await this._teamService.getAll();
    res.status(status).json(response);
  }

  async getTeamById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { status, response } = await this._teamService.getById(id);
    res.status(status).json(response);
  }
}

export default TeamsController;
