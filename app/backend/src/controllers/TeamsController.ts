import { Request, Response } from 'express';

import TeamService from '../services/TeamService';

class TeamsController {
  private _teamService = new TeamService();

  async getAllTeams(req: Request, res: Response): Promise<void> {
    const { type, result } = await this._teamService.getAll();
    res.status(type).json(result);
  }
}

export default TeamsController;
