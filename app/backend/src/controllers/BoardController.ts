import { Request, Response } from 'express';

import BoardService from '../services/BoardService';

class BoardController {
  private _boardService = new BoardService();

  async getHomeInfo(req: Request, res: Response) {
    const result = await this._boardService.getInfo('homeTeamId');
    return res.status(200).json(result);
  }
}

export default BoardController;
