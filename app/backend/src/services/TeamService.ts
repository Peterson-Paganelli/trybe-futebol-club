import Teams from '../database/models/Teams';

class TeamService {
  public getAll = async () => {
    const result = await Teams.findAll();
    return { status: 200, response: result };
  };

  public getById = async (id: string) => {
    const result = await Teams.findOne({ where: { id } });
    return { status: 200, response: result };
  };
}

export default TeamService;
