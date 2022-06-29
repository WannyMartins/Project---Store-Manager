const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const ProductModel = require('../../../models/productsModels');

describe('Buscar por produtos do DB', () => {
  before(async () => {
    const execute = [
      {
        "id": 1,
        "name": "Martelo de Thor",
      },
      {
        "id": 2,
        "name": "Traje de encolhimento",
      }
    ]

    sinon.stub(connection, 'execute').resolves(execute);
  })

  after(async () => {
    connection.execute.restore();
  })
  describe('Quando há produtos cadastrados', () => {
    it('retorna todos na rota "/products"', async () => {
      const response = await ProductModel.getAll();
      expect(response).to.be.not.empty;
    });
    it('retorna todos na rota "/products"', async () => {
      const response = await ProductModel.getAll();
      expect(response).to.include.all.keys('id', 'name');
    });

    it('retorna todos na rota "/products:/id"', async () => {
      const response = await ProductModel.getById(1);
      expect(response).to.be.not.empty;
    });
    it('retorna todos na rota "/products:/id"', async () => {
      const response = await ProductModel.getById(1);
      expect(response).to.include.all.keys('id', 'name');
    });

  });

})