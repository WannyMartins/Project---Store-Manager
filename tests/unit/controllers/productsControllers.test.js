const { expect, use } = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require("chai-as-promised");

const ProductService = require('../../../services/productsServices');
const ProductController = require('../../../controllers/productsControllers');

use(chaiAsPromised);

describe('ProductController', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('#getAll', () => {

    const example = [
      {
        "id": 1,
        "name": "Martelo de Thor",
      },
      {
        "id": 2,
        "name": "Traje de encolhimento",
      }
    ];

    describe('se há conteúdo', () => {
      it('o status retorna correto', async () => {
        const req = {};
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(ProductService, 'getAll').resolves(example);
        await ProductController.getAll(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });
      it('o json retorna correto', async () => {
        const req = {};
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(ProductService, 'getAll').resolves(example);
        await ProductController.getAll(req, res);
        expect(res.json.calledWith(example)).to.be.equal(true);

      });
    });
  });
  
  describe('#getById', () => {

    describe('se o "id" é válido', () => {
      
      it('o status retorna correto', async () => {
        const req = {};
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        req.params = {id: 1}

        sinon.stub(ProductService, 'getById').resolves([{ id: 1, name: "Martelo de Thor" }]);
        await ProductController.getById(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });
      it('o json retorna correto', async () => {
        const req = {};
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        req.params = { id: 1 }

        sinon.stub(ProductService, 'getById').resolves([{ id: 1, name: "Martelo de Thor" }]);
        await ProductController.getById(req, res);
        expect(res.json.calledWith({ id: 1, name: "Martelo de Thor" }))
          .to.be.equal(true);
      });

    });
    describe('se o "id" é inválido', () => {
      it('o status retorna correto', async () => {
        const req = {};
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        req.params = { id: "99999" }

        sinon.stub(ProductService, 'getById').resolves(false);
        await ProductController.getById(req, res);
        expect(res.status.calledWith(404)).to.be.equal(true);
      });
      it('o json retorna correto', async () => {
        const req = {};
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        req.params = { id: "9999" }

        sinon.stub(ProductService, 'getById').resolves(false);
        await ProductController.getById(req, res);
        expect(res.json.calledWith({ message: 'Product not found' })).to.be.equals(true);
      });

    });

  });
});
