const connection = require('./connection');

const ProductsModel = {
  getAll: async () => {
    const query = 'SELECT * FROM StoreManager.products;';
    const [result] = await connection.execute(query);
    return result;
  },

  getById: async (id) => {
    const query = 'SELECT * FROM StoreManager.products WHERE id = ?;';
    const [result] = await connection.execute(query, [id]);
    return result;
  },

  create: async ({ name }) => {
    const query = 'INSERT INTO StoreManager.products (name) VALUES (?);';
    const [{ insertId }] = await connection.execute(query, [name]);

    return insertId;
  },
  
  update: async (id, name) => {
    const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?;';
    const [{ affectedRows }] = await connection.execute(query, [name, id]);
    return affectedRows;
  },

  delete: async (id) => {
    const query = 'DELETE FROM StoreManager.products WHERE id = ?;';
    const [{ affectedRows }] = await connection.execute(query, [id]);
    return affectedRows;
  },

};

module.exports = ProductsModel;