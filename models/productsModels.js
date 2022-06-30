const connection = require('./connection');

async function getAll() {
  const query = 'SELECT * FROM StoreManager.products;';
  const [result] = await connection.execute(query);
  return result;
}

async function getById(id) {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?;';
  const [result] = await connection.execute(query, [id]);
  return result;
}

// async function createProduct(name) {
//   const query = 'INSERT INTO StoreManager.products (name) VALUES (?);';
//   const [{ insertId }] = await connection.execute(query, [name]);

//   return insertId;
// }

module.exports = {
  getAll,
  getById,
  // createProduct,
};