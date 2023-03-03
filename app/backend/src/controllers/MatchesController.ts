import { Request, Response } from 'express';

import MatchService from '../services/MatchService';

class MatchesController {
  private _matchSevice = new MatchService();

  async getAllMatches(_req: Request, res: Response): Promise<void> {
    const { status, response } = await this._matchSevice.getAll();
    console.log('AAA', response);
    res.status(status).json(response);
  }
}

export default MatchesController;
