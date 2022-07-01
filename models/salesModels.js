// const connection = require('./connection');

// async function addSale() {
//   const query = 'INSERT INTO StoreManager.sales (date) VALUES (default);';
//   const [{ insertId }] = await connection.execute(query);

//   return insertId;
// }

// async function createSales(productId, quantity) {
//   const query = `INSERT INTO StoreManager.sales_products
//     (product_id, quantity) VALUES (?, ?); `;
//   const [result] = await connection.execute(query, [productId, quantity]);
//   return result;

//   // return result.map((sale) => ({
//   //   id: sale.insertId,
//   //   saleId: sale.sale_id,
//   //   productId: sale.productId,
//   //   quantity: sale.quantity,

//   // }));
// }
// module.exports = {
//   addSale,
//   createSales,
// };