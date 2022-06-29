const ProductsModel = require('../models/productsModels');

async function getAll() {
  const getProducts = await ProductsModel.getAll();

  if (getProducts.length === 0) return false;

  return getProducts;
}

async function getById(id) {
  const getProducts = await ProductsModel.getById(id);

  if (getProducts.length === 0) return false;

  return getProducts;
}

module.exports = {
  getAll,
  getById,
};