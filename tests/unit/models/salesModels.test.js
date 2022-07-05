const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const SalesModels = require('../../../models/salesModels');

describe('SalesModels', () => {
  beforeEach(async () => {
    sinon.restore();
  });
  describe('#getAll', () => {
    const execute = [
      {
        "saleId": 1,
        "date": "2022-07-05T22:34:13.000Z",
        "productId": 1,
        "quantity": 5
      },
      {
        "saleId": 1,
        "date": "2022-07-05T22:34:13.000Z",
        "productId": 2,
        "quantity": 10
      },
      {
        "saleId": 2,
        "date": "2022-07-05T22:34:13.000Z",
        "productId": 3,
        "quantity": 15
      }
    ];
    it('a rota não retorna vazia', async () => {
      sinon.stub(connection, 'execute').resolves([execute]);
      const response = await SalesModels.getAll();
      expect(response).to.be.deep.equal(execute);
    });
  });

  describe('#getById', () => {

    const execute = [
      {
        "date": "2022-07-05T22:34:13.000Z",
        "productId": 3,
        "quantity": 15
      }
    ];
    it('a rota não retorna vazia', async () => {
      sinon.stub(connection, 'execute').resolves([execute]);
      const response = await SalesModels.getById();
      expect(response).to.be.deep.equal(execute);
    });

  });
});

