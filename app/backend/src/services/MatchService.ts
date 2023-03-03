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
    return { status: 200, response: result };
  };
}

export default MatchService;
