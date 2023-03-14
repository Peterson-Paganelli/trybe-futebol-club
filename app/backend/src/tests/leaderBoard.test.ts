import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
chai.use(chaiHttp);
const { expect } = chai;
import { teamsMock, mock } from './teams/teams.mock';
import { matchesMock } from './matches/matches.mock';
import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import GetTeamInfo from '../utils/getTeamInfo';

describe('Teste de integração da rota /leaderboard', function () {
  
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon.stub(Matches, 'findAll').resolves(matchesMock as any);
    sinon.stub(Teams, 'findAll').resolves(teamsMock as any);
  })

  afterEach(() => {
    sinon.restore();
  });

  it('Response 200 e a classificação dos times de casa', async () => {
    const response = await chai.request(app).get('/leaderboard/home')


    expect(response.status).to.be.equal(200);
  });
});