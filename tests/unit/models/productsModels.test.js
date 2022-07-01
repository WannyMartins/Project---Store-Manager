const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const ProductModel = require('../../../models/productsModels');

describe('ProductModel', () => {
  beforeEach(async () => {
    sinon.restore();
  });
  describe('#getAll', () => {
      const execute = [
        {
          "id": 1,
          "name": "Martelo de Thor",
        },
        {
          "id": 2,
          "name": "Traje de encolhimento",
        }
      ];

    it('a rota não retorna vazia', async () => {
      sinon.stub(connection, 'execute').resolves(execute);

      const response = await ProductModel.getAll();
      expect(response).to.be.not.empty;
    });
    it('retorna todos na rota', async () => {
      sinon.stub(connection, 'execute').resolves(execute);

      const response = await ProductModel.getAll();
      expect(response).to.include.all.keys('id', 'name');
    });
    });

  describe('#getById', () => {

    const execute = [
      {
        "id": 1,
        "name": "Martelo de Thor",
      }
    ];



    it('a rota não retorna vazia', async () => {
      sinon.stub(connection, 'execute').resolves(execute);

      const response = await ProductModel.getById(1);
      expect(response).to.be.not.empty;
    });
    it('retorna o produto com id correspondente', async () => {
      sinon.stub(connection, 'execute').resolves(execute);

      const response = await ProductModel.getById(1);
      expect(response).to.include.all.keys('id', 'name');
    });

  });



  describe('#create', () => {

      it('retorna um id', async () => {
        sinon.stub(connection, "execute").resolves([{ insertId: 1 }]);
        const response = await ProductModel.create('ProductX');

        expect(response).to.be.equal(1);
      });

    });
  })
