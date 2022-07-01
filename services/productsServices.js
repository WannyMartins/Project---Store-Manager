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
};
module.exports = ProductsServices;