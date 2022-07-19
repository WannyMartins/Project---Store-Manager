const connection = require('./connection');

const SalesModels = {

  getAll: async () => {
    const query = `
    SELECT 
    sp.sale_id AS saleId, 
    s.date, 
    sp.product_id AS productId, 
    sp.quantity
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s
    ON s.id = sp.sale_id;
    `;
    const [result] = await connection.execute(query);
    return result;
  },

  getById: async (id) => {
    const query = `
        SELECT
        s.date,
        sp.product_id AS productId,
        sp.quantity
        FROM StoreManager.sales_products AS sp
        INNER JOIN StoreManager.sales AS s
        ON s.id = sp.sale_id
        WHERE s.id = (?);
        `;
    const [result] = await connection.execute(query, [id]);
    return result;
  },

  delete: async (id) => {
    const query = 'DELETE FROM StoreManager.sales WHERE id = ?;';
    const [{ affectedRows }] = await connection.execute(query, [id]);
    return affectedRows;
  },

  createSale: async () => {
    const query = 'INSERT INTO StoreManager.sales (date) VALUES (default)';
    const [{ insertId }] = await connection.execute(query);

    return insertId;
  },

  create: async (saleId, dados) => {
    const query = `INSERT INTO  StoreManager.sales_products
      (sale_id, product_id, quantity) VALUES (?, ?, ?);`;

    const resp = await connection.query(query, [saleId, dados.productId, dados.quantity]);

    return resp;
  },

  edite: async (id, productId, quantity) => {
    const query = `UPDATE StoreManager.sales_products 
    SET product_id = ?, quantity = ? WHERE sale_id = ? ;`;
    const [{ affectedRows }] = await connection.connection(query, [productId, quantity, id]);
    return affectedRows;
  },

};

module.exports = SalesModels;
