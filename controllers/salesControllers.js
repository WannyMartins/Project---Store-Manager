const ProductsServices = require('../services/productsServices');
const SalesServices = require('../services/salesServices');

const jsonNotFound = { message: 'Sale not found' };

const SalesController = {
  getAll: async (req, res) => {
    const sales = await SalesServices.getAll();

    if (sales.length === 0) return res.status(404).json(jsonNotFound);

    return res.status(200).json(sales);
  },

  getById: async (req, res) => {
    const { id } = req.params;
    const sales = await SalesServices.getById(id);
    if (!sales) return res.status(404).json(jsonNotFound);

    return res.status(200).json(sales);
  },

  create: async (req, res) => {
    await SalesServices.validateBody(req.body);
    
    const dados = req.body;
    const product = dados.map(({ productId }) => productId);
    await ProductsServices.getById(product);
   await SalesServices.create(dados);
    
    const result = {
      itemsSold: dados,
    };

    // if (sales.length === 0) return res.status(404).json(jsonNotFound);

    return res.status(200).json(result);
  },

  delete: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json(jsonNotFound);
    }
    const sale = await SalesServices.delete(Number(id));
    if (!sale) {
      return res.status(404).json(jsonNotFound);
    }

    return res.sendStatus(204);
  },

};

module.exports = SalesController;