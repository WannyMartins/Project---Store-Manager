const ProductsServices = require('../services/productsServices');

async function getAll(req, res) {
  const result = await ProductsServices.getAll();

  if (!result) return res.status(404).json({ message: 'Product not found' });

  return res.status(200).json(result);
}

async function getById(req, res) {
  const { id } = req.params;
  const result = await ProductsServices.getById(id);

  if (!result) return res.status(404).json({ message: 'Product not found' });

  return res.status(200).json(result[0]);
}

module.exports = {
  getAll,
  getById,
};