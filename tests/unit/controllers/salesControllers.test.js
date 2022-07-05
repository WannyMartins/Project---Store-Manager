const { expect, use } = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require("chai-as-promised");

const SalesServices = require('../../../services/salesServices');
const SalesController = require('../../../controllers/salesControllers');

use(chaiAsPromised);


describe('SalesController', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('#getAll', () => {

    describe('se há conteúdo', () => {
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


      it('o status retorna correto', async () => {
        sinon.stub(SalesServices, 'getAll').resolves(example);

        const req = {};
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();

        await SalesController.getAll(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });
      it('o json retorna correto', async () => {
        sinon.stub(SalesServices, 'getAll').resolves(example);

        const req = {};
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        await SalesController.getAll(req, res);
        expect(res.json.calledWith(example)).to.be.equal(true);

      });
    });

    describe('se não há conteúdo', () => {
      it('o status retorna correto', async () => {
        sinon.stub(SalesServices, 'getAll').resolves([]);

        const req = {};
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();

        await SalesController.getAll(req, res);
        expect(res.status.calledWith(404)).to.be.equal(true);
      });
    });

  });

  describe('#getById', () => {

    describe('se o "id" é válido', () => {

      it('o status retorna correto', async () => {
        const req = {};
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();

        req.params = { id: 1 }

        sinon.stub(SalesServices, 'getById').resolves([
          {
            "date": "2022-07-05T22:34:13.000Z",
            "productId": 3,
            "quantity": 15
          }
        ]);
        await SalesController.getById(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });
    });
    describe('se o "id" é inválido', () => {
      it('o status retorna correto', async () => {
        const req = {};
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        req.params = { id: '99999' }

        sinon.stub(SalesServices, 'getById').resolves(false);
        await SalesController.getById(req, res);
        expect(res.status.calledWith(404)).to.be.equal(true);
      });

    });
  });

  describe('#delete', () => {

    describe('se informar o name e id válido', () => {
      it('o status retorna correto', async () => {
        const req = {};
        const res = {};

        res.sendStatus = sinon.stub().returns(res);
        res.json = sinon.stub();

        req.body = { name: 'teste' };
        req.params = { id: 1 }

        sinon.stub(SalesServices, 'delete').resolves(1);

        await SalesController.delete(req, res);

        expect(res.sendStatus.calledWith(204)).to.be.equal(true);
      });

    });

    describe('se informar o id inválido', () => {
      it('com id invalido o status retorna correto', async () => {
        const req = {};
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();

        req.body = { name: 'teste' };
        req.params = { id: 'teste' }

        sinon.stub(SalesServices, 'delete').resolves(false);

        await SalesController.delete(req, res);

        expect(res.status.calledWith(404)).to.be.equal(true);
      });

      it('com id vazio o status retorna correto', async () => {
        const req = {};
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();

        req.body = { name: 'teste' };
        req.params = { id: '' }

        sinon.stub(SalesServices, 'delete').resolves(false);

        await SalesController.delete(req, res);

        expect(res.status.calledWith(404)).to.be.equal(true);
      });


    });

  });

      
  });
