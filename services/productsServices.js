const ProductsModel = require('../models/productsModels');

const ProductsServices = {
  getAll: async () => {
    const getProducts = await ProductsModel.getAll();

    return getProducts;
  },

  getById: async (id) => {
    const getProducts = await ProductsModel.getById(id);

    return getProducts;
  },

  create: async ({ name }) => {
    const id = await ProductsModel.create({ name });
    return { id, name };
  },

  update: async (id, name) => {
    const updatemodel = await ProductsModel.update(id, name);

    if (updatemodel === 0) return false;
    return { id, name };
  },

  delete: async (id) => {
    const updatemodel = await ProductsModel.delete(id);

    if (updatemodel === 0) {
      return false;
    }
    return { id };
  },

};
module.exports = ProductsServices;