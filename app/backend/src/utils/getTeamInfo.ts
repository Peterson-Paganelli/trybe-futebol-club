import Matches from '../database/models/Matches';

class GetTeamInfo {
  public getTotalGames = async (id: string, path: string) => {
    const matches = await Matches.findAll({ where: { inProgress: false } });
    return matches.filter((match: any) => match[path] === id);
  };

  public getTotalVictories = async (path: string, totalGames: any) => {
    if (path === 'homeTeamId') {
      return totalGames.filter((match: any) =>
        match.homeTeamGoals > match.awayTeamGoals);
    }
    return totalGames.filter((match: any) => match.homeTeamGoals < match.awayTeamGoals);
  };

  public getTotalDraws = async (totalGames: any) =>
    totalGames.filter((match: any) => match.homeTeamGoals === match.awayTeamGoals);

  public getTotalLosses = async (path: string, totalGames: any) => {
    if (path === 'homeTeamId') {
      return totalGames.filter((match: any) =>
        match.homeTeamGoals < match.awayTeamGoals);
    }
    return totalGames.filter((match: any) => match.homeTeamGoals > match.awayTeamGoals);
  };

  public getGoalsFavor = async (path: string, totalGames: any) => {
    if (path === 'homeTeamId') {
      return totalGames.reduce((sum: number, match: any) => sum + match.homeTeamGoals, 0);
    }
    return totalGames.reduce((sum: number, match: any) => sum + match.awayTeamGoals, 0);
  };

  public getGoalsOwn = async (path: string, totalGames: any) => {
    if (path === 'homeTeamId') {
      return totalGames.reduce((sum: number, match: any) => sum + match.awayTeamGoals, 0);
    }
    return totalGames.reduce((sum: number, match: any) => sum + match.homeTeamGoals, 0);
  };

  public getEfficiency = async (path: string, totalGames: any) => {
    const points = ((await this.getTotalVictories(path, totalGames)).length * 3)
    + (await this.getTotalDraws(totalGames)).length;
    const efficiency = ((points / (totalGames.length * 3)) * 100).toFixed(2);
    return efficiency;
  };

  public sortResult = (teamsData: any) => {
    const sortedData = teamsData.sort((a: any, b: any) => (b.totalPoints - a.totalPoints)
      || (b.goalsBalance - a.goalsBalance)
      || (b.goalsFavor - a.goalsFavor)
      || (b.goalsOwn - a.goalsOwn));

    return sortedData;
  };
}

export default GetTeamInfo;
