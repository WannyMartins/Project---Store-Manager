const { expect } = require('chai');
const sinon = require('sinon');

const ProductService = require('../../../services/productsServices');

describe('#getAll', () => {
  describe('se o retorno não é vazio', () => {

    before(async () => {
      const example = [
        {
          "id": 1,
          "name": "Martelo de Thor",
        },
        {
          "id": 2,
          "name": "Traje de encolhimento",
        }
      ]
      sinon.stub(ProductService, 'getAll').resolves(example);
    })

    after(async () => {
      ProductService.getAll.restore();
    })


    it('retorna todos na rota "/products"', async () => {
      const response = await ProductService.getAll();
      expect(response).to.be.not.empty;
    });

    it('retorna um array de produtos', async () => {
      const response = await ProductService.getAll();
      expect(response).to.be.an('array');
    });

    it('o array contem mais de 1 produto', async () => {
      const response = await ProductService.getAll();
      expect(response).to.be.length(2);
    });

  });

  describe('se o resultado é vazio', () => {

    before(async () => {
      const example = false
      sinon.stub(ProductService, 'getAll').resolves(example);
    })

    after(async () => {
      ProductService.getAll.restore();
    })


    it('retorno boolean', async () => {
      const response = await ProductService.getAll();
      expect(response).to.be.a('boolean');
    });

    it('retorna false', async () => {
      const response = await ProductService.getAll();
      expect(response).to.be.equal(false);
    });


  });
});


  describe('#getById', () => {
    describe('se o retorno é vazio', () => {
        before(async () => {
          const example = false
        
          sinon.stub(ProductService, 'getById').resolves(example);
        });
      
        after(async () => {
          ProductService.getById.restore();
        });

        it('retorno boolean', async () => {
          const response = await ProductService.getById();
          expect(response).to.be.a('boolean');
        });

        it('retorna false', async () => {
          const response = await ProductService.getById();
          expect(response).to.be.equal(false);
        });
    })
    describe('se o retorno não é vazio', () => {
      before(async () => {
        const example =
        {
          "id": 1,
          "name": "Martelo de Thor",
        }


        sinon.stub(ProductService, 'getById').resolves(example);
      })

      after(async () => {
        ProductService.getById.restore();
      })

      it('não retorna vazio', async () => {
        const response = await ProductService.getById(1);
        expect(response).to.be.not.empty;
      });
      it('retorna um objeto', async () => {
        const response = await ProductService.getById(1);
        expect(response).to.be.an('object');
      });
      it('retorna as chaves', async () => {
        const response = await ProductService.getById(1);
        expect(response).to.include.keys('id', 'name');
      });


    });
      

    });



