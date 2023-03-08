import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
chai.use(chaiHttp);
const { expect } = chai;
import { teamsMock, mock } from './teams/teams.mock';
import Teams from '../database/models/Teams';

describe('Teste de integração da rota /teams', function () {
  
  afterEach(() => {
    sinon.restore();
  });

  it('Retorna uma lista de times e o status 200', async function () {
    const response = await chai.request(app)
      .get('/teams').send(teamsMock);

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(teamsMock)
  });

  it('Retorna um time utilizando a rota /teams/1', async function () {
    sinon.stub(Teams, 'findByPk').resolves(mock as any);

    const response = await chai.request(app)
      .get('/teams/1').send(mock);

    expect(response.status).to.be.deep.equal(200);
    expect(response.body).to.be.deep.equal(mock);
  });
});