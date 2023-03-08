import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcryptjs from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
chai.use(chaiHttp);
const { expect } = chai;
import { userMock, roleMock, tokenMock } from './users/login.mock';
import Users from '../database/models/Users';

describe('Teste de integração da rota /login', function () {
  let chaiHttpResponse: Response;
  beforeEach(async () => {
    sinon.stub(Users, 'findOne').resolves(userMock as Users)
  })

  afterEach(() => {
    sinon.restore();
  });

  it('testa o endpoint POST com credenciais válidas', async function () {
    // sinon.stub(bcryptjs, 'compareSync').returns(true);
    chaiHttpResponse = await chai.request(app)
      .post('/login').send({
        "email": "admin@admin.com",
        "password": "secret_admin"
      });

      expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('testa o endpoint POST com credenciais inválidas', async function () {
    chaiHttpResponse = await chai.request(app)
      .post('/login').send({
        "email": "adm@admin.com",
        "password": "insecret_admin"
      });

      expect(chaiHttpResponse.status).to.be.equal(401);
  });

  it('Retorna status 200 ao acessar a rota /login/role com token certo ', async function () {
    const response = await chai.request(app).get("/login/role").set({ 'Authorization': tokenMock.token });
    expect(response.status).to.be.equal(200)
    expect(response.body).to.deep.equal({"role": "admin"});
  });

  it('Retorna um erro ao passar um token errado', async function () {
    const response = await chai.request(app).get("/login/role").set({ 'Authorization': tokenMock.wrongToken });
    expect(response.status).to.be.equal(401)
    expect(response.body).to.deep.equal({"message": "Token must be a valid token"});
  });
});