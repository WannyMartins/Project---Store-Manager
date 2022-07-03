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
    if (typeof id !== 'number') return false;
    if (!name || name.length < 5) return false;

   const updateModel = await ProductsModel.update(Number(id), name);

    if (!updateModel) return false;
    return { id, name };
  },

  delete: async (id) => {
    if (typeof id !== 'number' || id <= 0 || id === undefined) return false;

    const deleteModel = await ProductsModel.delete(Number(id));
    if (!deleteModel) return false;
    return { id };
  },

};
module.exports = ProductsServices;