const { expect, use } = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require("chai-as-promised");

const SalesServices = require('../../../services/salesServices');
const SalesModels = require('../../../models/salesModels')

use(chaiAsPromised);

describe('SalesServices', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('#getAll', () => {

   const example = [
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

    describe('se há conteúdo', () => {
      it('se houver produtos não retorna vazio', async () => {
        sinon.stub(SalesModels, 'getAll').resolves(example);
        const response = await SalesServices.getAll();
        expect(response).to.be.deep.equal(example)
      });
    });
  });

  describe('#getById', () => {

    describe('se o retorno não é vazio', () => {

      const example = [
        {
          "date": "2022-07-05T22:34:13.000Z",
          "productId": 3,
          "quantity": 15
        }
      ];

      it('retorna o valor referente ao saleId indicado', async () => {
        sinon.stub(SalesModels, 'getById').resolves(example);
        const response = await SalesServices.getById(2);
        expect(response).to.be.equal(example);
      });
    });

    describe('se o retorno é vazio', () => {

      it('retorna o valor referente ao saleId indicado', async () => {
        sinon.stub(SalesModels, 'getById').resolves([]);
        const response = await SalesServices.getById(false);
        expect(response).to.be.equal(false);
      });
    });

  });

  describe('#delete', () => {

    it('informando um "id" válido', async () => {
      sinon.stub(SalesModels, 'delete').resolves(1);
      const response = await SalesServices.delete(1);
      expect(response).to.be.deep.equal({ id: 1 });
    });

    it('informando um "id" inválido', async () => {
      sinon.stub(SalesModels, 'delete').resolves('teste');
      const response = await SalesServices.delete('teste');
      expect(response).to.be.deep.equal(false);
    });

    it('informando um "id" inválido', async () => {
      sinon.stub(SalesModels, 'delete').resolves(0);
      const response = await SalesServices.delete(NaN);
      expect(response).to.be.deep.equal(false);
    });
  });
 });

