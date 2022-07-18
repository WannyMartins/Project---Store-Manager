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

  create: async (dados) => {
    const query = `INSERT INTO  StoreManager.sales_products
      (sale_id, product_id, quantity) VALUES ?;`;

    const saleId = await SalesModels.createSale();

    const result = dados.map(({ productId, quantity }) => [saleId, productId, quantity]);
    console.log(result);

    await connection.query(query, [result], true);
  },

  // edite: async (id, changes) => {
  //   const query = 'UPDATE StoreManager.sales_products SET ? WHERE id = ?;';
  //   const [{ affectedRows }] = await connection.execute(query, [changes, id]);
  //   return affectedRows;
  // },

};

module.exports = SalesModels;
