import MatchPayload from '../interfaces/MatchUpdate.interface';
import MatchesGoals from '../interfaces/Matches.interface';

import { validateToken } from '../auth/jwt';
import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';

class MatchService {
  protected verifyTeams = async (homeTeamId: number, awayTeamId: number) => {
    if (homeTeamId === awayTeamId) {
      return { status: 422,
        response: {
          message: 'It is not possible to create a match with two equal teams',
        } };
    }
    const homeTeam = await Teams.findOne({ where: { id: homeTeamId } });
    const awayTeam = await Teams.findOne({ where: { id: awayTeamId } });
    if (!homeTeam || !awayTeam) {
      return { status: 404, response: { message: 'There is no team with such id!' } };
    }
    return { message: 'successful' };
  };

  protected verifyToken = async (token: string | undefined) => {
    const payload = validateToken(token);
    if (payload.status) {
      return {
        status: payload.status,
        response: { message: payload.response },
      };
    }
    return { message: 'successful' };
  };

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
        awayTeamGoals: teamsGoals.awayTeamGoals,
      },
      { where: { id } },
    );
    return { status: 200, response: result[0] };
  };

  public postMatch = async (token: string | undefined, info: MatchPayload) => {
    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals } = info;
    const verifyToken = await this.verifyToken(token);
    if (verifyToken.status) return verifyToken;
    const verifyTeams = await this.verifyTeams(homeTeamId, awayTeamId);
    if (verifyTeams.status) return verifyTeams;
    const result = await Matches.create(
      {
        homeTeamId,
        homeTeamGoals,
        awayTeamId,
        awayTeamGoals,
        inProgress: true,
      },
    );

    return { status: 201, response: result };
  };
}

export default MatchService;
