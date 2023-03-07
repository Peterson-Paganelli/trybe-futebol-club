import Leaderboard from '../interfaces/Leaderboard.interface';
import GetTeamInfo from '../utils/getTeamInfo';
import Teams from '../database/models/Teams';

class BoardService {
  private _getInfo = new GetTeamInfo();

  private teamsResolve = async (path: string) => {
    const teams = await Teams.findAll();
    const teamsData = await Promise.all(teams.map(async (team) => this
      ._getInfo.getTeamInfo(team, path)));
    const data = this._getInfo.sortResult(teamsData);
    return data;
  };

  public getInfo = async (path: string) => {
    const result = await this.teamsResolve(path);
    return result;
  };

  public getAllInfo = async (): Promise<Leaderboard[]> => {
    const homeTeams = await this.teamsResolve('homeTeamId');
    const awayTeams = await this.teamsResolve('awayTeamId');
    const data = this._getInfo.getAllTeamInfo(homeTeams, awayTeams);
    const result = this._getInfo.sortResult(data);
    return result;
  };
}

export default BoardService;
