import { Request, Response } from 'express';

import BoardService from '../services/BoardService';

class BoardController {
  private _boardService = new BoardService();

  async getAllInfo(_req: Request, res: Response) {
    const result = await this._boardService.getAllInfo();
    return res.status(200).json(result);
  }

  async getHomeInfo(_req: Request, res: Response) {
    const result = await this._boardService.getInfo('homeTeamId');
    return res.status(200).json(result);
  }

  async getAwayInfo(_req: Request, res: Response) {
    const result = await this._boardService.getInfo('awayTeamId');
    return res.status(200).json(result);
  }
}

export default BoardController;
