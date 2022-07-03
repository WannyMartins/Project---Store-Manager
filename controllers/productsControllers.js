const ProductsServices = require('../services/productsServices');

const jsonNotFound = { message: 'Product not found' };

const ProductsControllers = {

  getAll: async (req, res) => {
    const result = await ProductsServices.getAll();

    if (result.length === 0) return res.status(404).json(jsonNotFound);

    return res.status(200).json(result);
  },

  getById: async (req, res) => {
    const { id } = req.params;
    const result = await ProductsServices.getById(id);
    if (result.length === 0) return res.status(404).json(jsonNotFound);
    
    return res.status(200).json(result[0]);
  },

  create: async (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: '"name" is required' });
    if (name.length < 5) {
      return res.status(422)
      .json({ message: '"name" length must be at least 5 characters long' }); 
    }
    const response = await ProductsServices.create({ name });
    const result = { ...response };

    return res.status(201).json(result);
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: '"name" is required' });
    if (name.length < 5) {
      return res.status(422)
      .json({ message: '"name" length must be at least 5 characters long' });
    }
    const updateServices = await ProductsServices.update(Number(id), name);

    if (!updateServices) {
      return res.status(404).json(jsonNotFound);
    }
    return res.status(200).json(updateServices);
  },

  delete: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json(jsonNotFound);
    }

    const product = await ProductsServices.delete(Number(id));
    if (!product) {
      return res.status(404).json(jsonNotFound);
    }

    return res.sendStatus(204);
  },

};

module.exports = ProductsControllers;
