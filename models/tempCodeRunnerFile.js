const connection = require('./connection');

async function getAll() {
  const query = 'SELECT * FROM StoreManager.products;';
  const [result] = await connection.execute(query);
  return result;
}

console.log(getAll());
module.exports = {
  getAll,
};