import { validateToken } from '../auth/jwt';
import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';

class MatchService {
  public getAll = async () => {
    const result = await Matches.findAll(
      {
        include: [
          { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
          { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
        ],
      },
    );
    return result;
  };

  public finishMatch = async (
    id: number,
    token: string | undefined,
  ) => {
    const payload = validateToken(token);
    if (payload.status) {
      return {
        status: payload.status,
        response: { message: payload.response },
      };
    }
    await Matches.update({ inProgress: false }, { where: { id } });
    return { status: 200, response: { message: 'Finished' } };
  };
}

export default MatchService;
