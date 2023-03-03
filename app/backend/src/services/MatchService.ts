import MatchesGoals from '../interfaces/Matches.interface';
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

  public updateMatch = async (
    id: number,
    token: string | undefined,
    teamsGoals: MatchesGoals,
  ) => {
    const payload = validateToken(token);
    if (payload.status) {
      return {
        status: payload.status,
        response: { message: payload.response },
      };
    }
    const result = await Matches.update(
      { homeTeamGoals: teamsGoals.homeTeamGoals,
        awayTeamGoals: teamsGoals.awayTeamGoals },
      { where: { id } },
    );
    return { status: 200, response: result[0] };
  };
}

export default MatchService;
