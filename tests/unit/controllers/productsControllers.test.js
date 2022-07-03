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

    describe('se há conteúdo', () => {
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


      it('o status retorna correto', async () => {
        sinon.stub(ProductService, 'getAll').resolves(example);
        
        const req = {};
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();

        await ProductController.getAll(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });
      it('o json retorna correto', async () => {
        sinon.stub(ProductService, 'getAll').resolves(example);
        
        const req = {};
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        await ProductController.getAll(req, res);
        expect(res.json.calledWith(example)).to.be.equal(true);

      });
    });

    describe('se não há conteúdo', () => {
      it('o status retorna correto', async () => {
        sinon.stub(ProductService, 'getAll').resolves([]);

        const req = {};
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();

        await ProductController.getAll(req, res);
        expect(res.status.calledWith(404)).to.be.equal(true);
      });
      it('o json retorna correto', async () => {
        sinon.stub(ProductService, 'getAll').resolves([]);

        const req = {};
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();

        await ProductController.getAll(req, res);
        expect(res.json.calledWith({ message: 'Product not found' })).to.be.equal(true);

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
        req.params = { id: '99999' }

        sinon.stub(ProductService, 'getById').resolves([]);
        await ProductController.getById(req, res);
        expect(res.status.calledWith(404)).to.be.equal(true);
      });
      it('o json retorna correto', async () => {
        const req = {};
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        req.params = { id: "teste" }

        sinon.stub(ProductService, 'getById').resolves([]);
        await ProductController.getById(req, res);
        expect(res.json.calledWith({"message": "Product not found"})).to.be.deep.equal(true);
      });

    });

  });

  describe('#create', () => {

    describe('se informar o name válido', () => {
      it('o status retorna correto', async () => {
        const req = {};
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();

        req.body = {name: 'teste'}

        sinon.stub(ProductService, 'create').resolves(3);

        await ProductController.create(req, res);

        expect(res.status.calledWith(201)).to.be.equal(true);
      });

      describe('se informar o name inválido', () => {
        it('o status retorna correto', async () => {
          const req = {};
          const res = {};

          res.status = sinon.stub().returns(res);
          res.json = sinon.stub();

          req.body = { name: 'test' }

          sinon.stub(ProductService, 'create').resolves(3);

          await ProductController.create(req, res);

          expect(res.status.calledWith(422)).to.be.equal(true);
        });
        it('o status retorna correto', async () => {
          const req = {};
          const res = {};

          res.status = sinon.stub().returns(res);
          res.json = sinon.stub();

          req.body = { name: '' }

          sinon.stub(ProductService, 'create').resolves(3);

          await ProductController.create(req, res);

          expect(res.status.calledWith(400)).to.be.equal(true);
        });

      });

    });
  });

  describe('#update', () => {

    describe('se informar o name e id válido', () => {
      it('o status retorna correto', async () => {
        const req = {};
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();

        req.body = { name: 'teste' };
        req.params = { id: 1 }

        sinon.stub(ProductService, 'update').resolves(1);

        await ProductController.update(req, res);

        expect(res.status.calledWith(200)).to.be.equal(true);
      });

    });

    describe('se informar o name inválido', () => {
      it('com nome menor que 5 caracteres o status retorna correto', async () => {
        const req = {};
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();

        req.body = { name: 'te' };
        req.params = { id: 1 }

        sinon.stub(ProductService, 'update').resolves(1);

        await ProductController.update(req, res);

        expect(res.status.calledWith(422)).to.be.equal(true);
      });

      it('com nome vazio o status retorna correto', async () => {
        const req = {};
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();

        req.body = { name: '' };
        req.params = { id: 1 }

        sinon.stub(ProductService, 'update').resolves(1);

        await ProductController.update(req, res);

        expect(res.status.calledWith(400)).to.be.equal(true);
      });

    });

    describe('se informar o id inválido', () => {
      it('o status retorna correto', async () => {
        const req = {};
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();

        req.body = { name: 'teste' };
        req.params = { id: 'teste' }

        sinon.stub(ProductService, 'update').resolves(false);

        await ProductController.update(req, res);

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

        sinon.stub(ProductService, 'delete').resolves(1);

        await ProductController.delete(req, res);

        expect(res.sendStatus.calledWith(204)).to.be.equal(true);
      });

    });

    describe('se informar o id inválido', () => {
      it('com id invalidoo status retorna correto', async () => {
        const req = {};
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();

        req.body = { name: 'teste' };
        req.params = { id: 'teste' }

        sinon.stub(ProductService, 'delete').resolves(false);

        await ProductController.delete(req, res);

        expect(res.status.calledWith(404)).to.be.equal(true);
      });

      it('com id vazio o status retorna correto', async () => {
        const req = {};
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();

        req.body = { name: 'teste' };
        req.params = { id: '' }

        sinon.stub(ProductService, 'delete').resolves(false);

        await ProductController.delete(req, res);

        expect(res.status.calledWith(404)).to.be.equal(true);
      });


    });

  });

  describe('#search', () => {

    describe('se informar um term válido', () => {
      it('o status retorna correto', async () => {
        const req = {};
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();

        req.query = { q: 'Martelo' };

        sinon.stub(ProductService, 'search').resolves({ id: 1, name: "Martelo de Thor" });

        await ProductController.search(req, res);

        expect(res.status.calledWith(200)).to.be.equal(true);
      });

    });

  });



});
