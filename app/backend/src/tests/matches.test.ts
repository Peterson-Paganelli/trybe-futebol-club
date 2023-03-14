import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
chai.use(chaiHttp);
const { expect } = chai;
import { mock } from './teams/teams.mock';
import { matchesMock } from './matches/matches.mock';
import { finishedMatch, createMatch,
  createdMatchOutput, updatedMatch, createMatchWrong } from './matches/finishedMatch.mock'
import { tokenMock } from './users/login.mock';
import Matches from '../database/models/Matches';

describe('Teste de integração da rota /matches', function () {
  
  afterEach(() => {
    sinon.restore();
  });

  it('Retorna uma lista de partidas e o status 200', async function () {
    const response = await chai.request(app)
      .get('/matches').send(matchesMock);

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(matchesMock)
  });

  it('Retorna uma lista de partidas em progresso e o status 200', async function () {
    sinon.stub(Matches, 'findAll').resolves(matchesMock as any);
    const response = await chai.request(app)
      .get('/matches?inProgress=true').send(matchesMock);

      expect(response.status).to.be.equal(200);
      expect(response.body.length).to.be.deep.equal(8)
  });

  it('Retorna uma lista de partidas em progresso e o status 200', async function () {
    sinon.stub(Matches, 'findAll').resolves(matchesMock as any);
    const response = await chai.request(app)
      .get('/matches?inProgress=false').send(matchesMock);

      expect(response.status).to.be.equal(200);
      expect(response.body.length).to.be.deep.equal(40)
  });

  it('Testa o endpoint PATCH de update e retorna 200', async function () {
    sinon.stub(Matches, 'update').resolves(updatedMatch as any);
    const response = await chai.request(app)
      .patch('/matches/1').send(matchesMock)
      .set({ Authorization: tokenMock.token });

      expect(response.status).to.be.equal(200);
  });

  it('Retorna a mensagem "Finished" e o status 200', async () => {
    sinon.stub(Matches, 'update').resolves(finishedMatch as any);

    const response = await chai.request(app)
    .patch('/matches/1/finish')
    .set({ Authorization: tokenMock.token })

    expect(response.status).to.be.deep.equal(200);
    expect(response.body).to.be.deep.equal({ message: 'Finished' });
  })

  it('Testa o endpoint POST de matches', async () => {
    const response = await chai.request(app).post('/login').send({ 
      email: 'admin@admin.com', 
      password: 'secret_admin' 
    });
    const token = response.body.token;

    sinon.stub(Matches, 'create').resolves(createMatch as any);

    const result = await chai.request(app).post('/matches')
    .set('authorization', token).send(createdMatchOutput)

    expect(result.status).to.be.equal(201);
  })

  it('Testa o endpoint POST de matches e retorna erro com id errado', async () => {
    const response = await chai.request(app).post('/login').send({ 
      email: 'admin@admin.com', 
      password: 'secret_admin' 
    });
    const token = response.body.token;

    sinon.stub(Matches, 'create').resolves(createMatchWrong as any);

    const result = await chai.request(app).post('/matches')
    .set('authorization', token).send(createMatchWrong)

    expect(result.status).to.be.equal(404);
  })

  it('esta o endpoint POST de matches e retorna erro 401 com token errado', async function () {
    const result = await chai.request(app).post('/login').send({ 
      email: 'adm@admin.com', 
      password: 'secret_admin' 
    });
    const token = result.body.token;
    sinon.stub(Matches, 'create').resolves(finishedMatch as any);

    const response = await chai.request(app)
      .post('/matches')
      .send(finishedMatch);
      
    expect(response.status).to.be.deep.equal(401);
    expect(response.body).to.be.deep.equal({ "message": "Token not found" });
  });
});