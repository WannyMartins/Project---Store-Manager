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

async function createProduct(req, res) {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: '"name" is required' });
  if (name.length < 5) {
 return res.status(422)
    .json({ message: '"name" length must be at least 5 characters long' }); 
}

  const result = await ProductsServices.createProduct(name);
  
return res.status(201).json(result);
}

module.exports = {
  getAll,
  getById,
  createProduct,
};
