import Teams from '../database/models/Teams';

class TeamService {
  public getAll = async () => {
    const result = await Teams.findAll();
    return { status: 200, response: result };
  };
}

export default TeamService;
