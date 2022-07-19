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
    const dados = req.body;
    await SalesServices.validateBody(dados);
    const product = dados.map(({ productId }) => productId);
    const productExist = await SalesServices.checkProductExist(product);
    const checkArray = productExist.some((prod) => prod.length === 0);
    if (checkArray === true) return res.status(404).json({ message: 'Product not found' });
    const id = await SalesServices.createSale();
    await SalesServices.create(id, dados);

    const result = {
      id,
      itemsSold: dados,
    };

    return res.status(201).json(result);
  },

  edite: async (req, res) => {
    const dados = req.body;
    await SalesServices.validateBody(dados);
    
    const { id } = req.params;
    const sale = await SalesServices.getById(id);
    if (!sale) {
      return res.status(404).json(jsonNotFound);
    }
    const product = dados.map(({ productId }) => productId);
    const productExist = await SalesServices.checkProductExist(product);
    const checkArray = productExist.some((prod) => prod.length === 0);
    if (checkArray === true) return res.status(404).json({ message: 'Product not found' });
    const updateServices = await SalesServices.edite(Number(id), dados);

    return res.status(200).json(updateServices);
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