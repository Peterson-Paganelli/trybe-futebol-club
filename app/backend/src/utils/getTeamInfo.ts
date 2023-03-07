import Matches from '../database/models/Matches';

class GetTeamInfo {
  private getTotalGames = async (id: string, path: string) => {
    const matches = await Matches.findAll({ where: { inProgress: false } });
    return matches.filter((match: any) => match[path] === id);
  };

  private getTotalVictories = async (path: string, totalGames: any) => {
    if (path === 'homeTeamId') {
      return totalGames.filter((match: any) =>
        match.homeTeamGoals > match.awayTeamGoals);
    }
    return totalGames.filter((match: any) => match.homeTeamGoals < match.awayTeamGoals);
  };

  private getTotalDraws = async (totalGames: any) =>
    totalGames.filter((match: any) => match.homeTeamGoals === match.awayTeamGoals);

  private getTotalLosses = async (path: string, totalGames: any) => {
    if (path === 'homeTeamId') {
      return totalGames.filter((match: any) =>
        match.homeTeamGoals < match.awayTeamGoals);
    }
    return totalGames.filter((match: any) => match.homeTeamGoals > match.awayTeamGoals);
  };

  private getGoalsFavor = async (path: string, totalGames: any) => {
    if (path === 'homeTeamId') {
      return totalGames.reduce((sum: number, match: any) => sum + match.homeTeamGoals, 0);
    }
    return totalGames.reduce((sum: number, match: any) => sum + match.awayTeamGoals, 0);
  };

  private getGoalsOwn = async (path: string, totalGames: any) => {
    if (path === 'homeTeamId') {
      return totalGames.reduce((sum: number, match: any) => sum + match.awayTeamGoals, 0);
    }
    return totalGames.reduce((sum: number, match: any) => sum + match.homeTeamGoals, 0);
  };

  private getEfficiency = async (path: string, totalGames: any) => {
    const points = ((await this.getTotalVictories(path, totalGames)).length * 3)
    + (await this.getTotalDraws(totalGames)).length;
    const efficiency = ((points / (totalGames.length * 3)) * 100).toFixed(2);
    return efficiency;
  };

  private getAllEfficiency = (totalPoints: number, totalGames: number) => (
    ((totalPoints / (totalGames * 3)) * 100)
  ).toFixed(2);

  public sortResult = (teamsData: any) => {
    const sortedData = teamsData.sort((a: any, b: any) => (b.totalPoints - a.totalPoints)
      || (b.goalsBalance - a.goalsBalance)
      || (b.goalsFavor - a.goalsFavor)
      || (b.goalsOwn - a.goalsOwn));

    return sortedData;
  };

  public getTeamInfo = async (team: any, path: string) => {
    const { teamName, id } = team.dataValues;
    const totalGames = (await this.getTotalGames(id, path));
    const goalsFavor = (await this.getGoalsFavor(path, totalGames));
    const goalsOwn = (await this.getGoalsOwn(path, totalGames));
    const teamInfo = {
      name: teamName,
      totalPoints: ((await this.getTotalVictories(path, totalGames)).length * 3)
      + (await this.getTotalDraws(totalGames)).length,
      totalGames: totalGames.length,
      totalVictories: (await this.getTotalVictories(path, totalGames)).length,
      totalDraws: (await this.getTotalDraws(totalGames)).length,
      totalLosses: (await this.getTotalLosses(path, totalGames)).length,
      goalsFavor,
      goalsOwn,
      goalsBalance: (goalsFavor - goalsOwn),
      efficiency: await this.getEfficiency(path, totalGames),
    };
    return teamInfo;
  };

  public getAllTeamInfo = (homeTeams: any, awayTeams: any) => homeTeams.map((team: any) => {
    const awayTeam = awayTeams.find((away: any) => away.name === team.name);
    return {
      name: team.name,
      totalPoints: team.totalPoints + awayTeam.totalPoints,
      totalGames: team.totalGames + awayTeam.totalGames,
      totalVictories: team.totalVictories + awayTeam.totalVictories,
      totalDraws: team.totalDraws + awayTeam.totalDraws,
      totalLosses: team.totalLosses + awayTeam.totalLosses,
      goalsFavor: team.goalsFavor + awayTeam.goalsFavor,
      goalsOwn: team.goalsOwn + awayTeam.goalsOwn,
      goalsBalance: team.goalsBalance + awayTeam.goalsBalance,
      efficiency: this.getAllEfficiency(
        (team.totalPoints + awayTeam.totalPoints),
        (team.totalGames + awayTeam.totalGames),
      ),
    };
  });
}

export default GetTeamInfo;
