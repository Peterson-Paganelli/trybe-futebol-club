import { Request, Response } from 'express';

import MatchService from '../services/MatchService';

class MatchesController {
  private _matchService = new MatchService();

  async getAllMatches(req: Request, res: Response) {
    const result = await this._matchService.getAll();
    const { inProgress } = req.query;
    if (inProgress) {
      const inProgressBool = (JSON.parse(inProgress as string));
      return res.status(200).json(result
        .filter((item) => item.inProgress === inProgressBool));
    }
    res.status(200).json(result);
  }

  async finishMatch(req: Request, res: Response) {
    console.log('B');
    const { authorization } = req.headers;
    const { id } = req.params;
    const { status, response } = await this._matchService
      .finishMatch((JSON.parse(id)), authorization);
    res.status(status).json(response);
  }

  async updateMatch(req: Request, res: Response) {
    const { authorization } = req.headers;
    const { id } = req.params;
    const { status, response } = await this._matchService
      .updateMatch((JSON.parse(id)), authorization, req.body);
    res.status(status).json(response);
  }

  async postMatch(req: Request, res: Response) {
    // const { authorization } = req.headers;
    const { status, response } = await this._matchService
      .postMatch(req.body);
    res.status(status).json(response);
  }
}

export default MatchesController;
