const { expect, use } = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require("chai-as-promised");

const ProductService = require('../../../services/productsServices');
const ProductModel = require('../../../models/productsModels')

use(chaiAsPromised);

describe('ProductService', () => {
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
    it('se houver produtos não retorna vazio', async () => {
      sinon.stub(ProductModel, 'getAll').resolves(example);
      const response = await ProductService.getAll();
      expect(response).to.be.not.empty;
    });
    it('se houver produtos retorna um "array"', async () => {
      sinon.stub(ProductModel, 'getAll').resolves(example);
      const response = await ProductService.getAll();
      expect(response).to.be.an('array');

    });
    it('retorna um array com o tamanho total do array de produtos', async () => {
      sinon.stub(ProductModel, 'getAll').resolves(example);
      const response = await ProductService.getAll();
      expect(response).to.be.length(example.length);
    });

    it('retorna um array com com o conteúdo correto', async () => {
      sinon.stub(ProductModel, 'getAll').resolves(example);
      const response = await ProductService.getAll();
      expect(response).to.be.equal(example)
    });
    
    });
  });


  describe('#getById', () => {
    describe('se o retorno é vazio', () => {

      it('retorno boolean', async () => {
        sinon.stub(ProductModel, 'getById').resolves(false);
          const response = await ProductService.getById();
          expect(response).to.be.a('boolean');
        });

        it('retorna false', async () => {
          sinon.stub(ProductModel, 'getById').resolves(false);
          const response = await ProductService.getById();
          expect(response).to.be.equal(false);
        });
    })
    describe('se o retorno não é vazio', () => {

      const example = [
        {
          "id": 1,
          "name": "Martelo de Thor",
        }
      ];

      it('não retorna vazio', async () => {
        sinon.stub(ProductModel, 'getById').resolves(example);
        const response = await ProductService.getById(1);
        expect(response).to.be.not.empty;
      });
      it('retorna um objeto', async () => {
        sinon.stub(ProductModel, 'getById').resolves(example);
        const response = await ProductService.getById(1);
        expect(response).to.be.an('array');
      });
      it('retorna as chaves', async () => {
        sinon.stub(ProductModel, 'getById').resolves(example);
        const response = await ProductService.getById(1);
        expect(response).to.be.equal(example);
      });
    });
      

  });

  describe('#create', () => {

      it('informando uma objeto válido', async () => {
        sinon.stub(ProductModel, 'create').resolves(3);
        const response = await ProductService.create({name: 'teste'});
        expect(response).to.be.deep.equal({ id: 3, name: 'teste' });
      });

  });

  describe('#update', () => {

    it('informando um "id" e "name" válidos', async () => {
      sinon.stub(ProductModel, 'update').resolves(1);
      const response = await ProductService.update(1, 'novo nome');
      expect(response).to.be.deep.equal({ id: 1, name: 'novo nome' });
    });

    it('informando um "id" inválido', async () => {
      sinon.stub(ProductModel, 'update').resolves(0);
      const response = await ProductService.update('teste', "novo teste");
      expect(response).to.be.deep.equal(false);
    });

    it('informando um "name" inválido', async () => {
      sinon.stub(ProductModel, 'update').resolves(1);
      const response = await ProductService.update(1, "novo");
      expect(response).to.be.deep.equal(false);
    });

    it('informando um "id" inválido', async () => {
      sinon.stub(ProductModel, 'update').resolves(0);
      const response = await ProductService.update(NaN, "teste");
      expect(response).to.be.deep.equal(false);
    });




  });

  describe('#delete', () => {

    it('informando um "id" válido', async () => {
      sinon.stub(ProductModel, 'delete').resolves(1);
      const response = await ProductService.delete(1);
      expect(response).to.be.deep.equal({ id: 1});
    });

    it('informando um "id" inválido', async () => {
      sinon.stub(ProductModel, 'delete').resolves('teste');
      const response = await ProductService.delete('teste');
      expect(response).to.be.deep.equal(false);
    });

    it('informando um "id" inválido', async () => {
      sinon.stub(ProductModel, 'delete').resolves(0);
      const response = await ProductService.delete(NaN);
      expect(response).to.be.deep.equal(false);
    });


  });

  describe('#search', () => {

    it('informando uma objeto válido', async () => {
      sinon.stub(ProductModel, 'search').resolves({
        "id": 1,
        "name": "Martelo de Thor",
      });
      const response = await ProductService.search('Martelo');
      expect(response).to.be.deep.equal({ id: 1, name: "Martelo de Thor" });
    });

  });





});
