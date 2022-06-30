const ProductsModel = require('../models/productsModels');

// const isValid = (name) => {
//   if (!name || typeof name !== 'string') return false;
//   return true;
// };

async function getAll() {
  const getProducts = await ProductsModel.getAll();

  if (getProducts.length === 0) return false;

  return getProducts;
}

async function getById(id) {
  const getProducts = await ProductsModel.getById(id);

  if (!getProducts) return false;

  return getProducts;
}

// async function createProduct(name) {
//   const isNameValid = isValid(name);

//   if (!isNameValid) return false;

//   const id = await ProductsModel.createProduct(name);
//   return { id, name };
// }

module.exports = {
  getAll,
  getById,
  // createProduct,
};