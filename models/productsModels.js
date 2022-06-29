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

module.exports = {
  getAll,
  getById,
};