import { Request, Response } from 'express';

import MatchService from '../services/MatchService';

class MatchesController {
  private _matchSevice = new MatchService();

  async getAllMatches(req: Request, res: Response) {
    const result = await this._matchSevice.getAll();
    const { inProgress } = req.query;
    if (inProgress) {
      const inProgressBool = (JSON.parse(inProgress as string));
      return res.status(200).json(result
        .filter((item) => item.inProgress === inProgressBool));
    }

    res.status(200).json(result);
  }
}

export default MatchesController;
