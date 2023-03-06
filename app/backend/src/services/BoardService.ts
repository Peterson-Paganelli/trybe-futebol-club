// import Leaderboard from '../interfaces/Leaderboard.interface';
import GetTeamInfo from '../utils/getTeamInfo';
import Teams from '../database/models/Teams';

class BoardService extends GetTeamInfo {
  private _getInfo = new GetTeamInfo();

  private _getTeamInfo = async (team: any, path: string) => {
    const { teamName, id } = team.dataValues;
    const totalGames = (await this._getInfo.getTotalGames(id, path));
    const goalsFavor = (await this._getInfo.getGoalsFavor(path, totalGames));
    const goalsOwn = (await this._getInfo.getGoalsOwn(path, totalGames));
    const teamInfo = {
      name: teamName,
      totalPoints: ((await this._getInfo.getTotalVictories(path, totalGames)).length * 3)
      + (await this._getInfo.getTotalDraws(totalGames)).length,
      totalGames: totalGames.length,
      totalVictories: (await this._getInfo.getTotalVictories(path, totalGames)).length,
      totalDraws: (await this._getInfo.getTotalDraws(totalGames)).length,
      totalLosses: (await this._getInfo.getTotalLosses(path, totalGames)).length,
      goalsFavor,
      goalsOwn,
      goalsBalance: (goalsFavor - goalsOwn),
      efficiency: await this._getInfo.getEfficiency(path, totalGames),
    };
    return teamInfo;
  };

  public getInfo = async (path: string) => {
    const teams = await Teams.findAll();
    const teamsData = await Promise.all(teams.map(async (team) => this._getTeamInfo(team, path)));
    const result = this._getInfo.sortResult(teamsData);
    return result;
  };
}

export default BoardService;
