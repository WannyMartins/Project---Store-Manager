const Joi = require('joi');
const ProductsModel = require('../models/productsModels');
const SalesModels = require('../models/salesModels');

const SalesServices = {
  validateBody: (data) => {
    const schema = Joi.array().items({
     productId: Joi.number().required(),
        quantity: Joi.number().min(1).required(),
      });

    const { error, value } = schema.validate(data);
    if (error) {
      if (error.message.includes('must be greater than or equal to 1')) {
        error.message = error.message.replace(/[[*].]/, '').replace('.', '');
        error.status = 422;
        throw error;
      }
      error.status = 400;
      error.message = error.message.replace(/[[*].]/, '').replace('.', '');
      throw error;
    }

    return value;
  },
  getAll: async () => {
    const getSales = await SalesModels.getAll();
    return getSales;
  },

  getById: async (id) => {
    const getSales = await SalesModels.getById(id);
    if (getSales.length === 0) return false;
    return getSales;
  },

  checkProductExist: async (ids) => {
    const getPrduct = await Promise.all(ids.map((id) => ProductsModel.getById(id)));
    if (!getPrduct) return false;
    return getPrduct;
  },

  delete: async (id) => {
    if (typeof id !== 'number' || id <= 0 || id === undefined) return false;

    const sale = await SalesModels.delete(Number(id));
    if (!sale) return false;
    return { id };
  },

  createSale: async () => {
    const result = await SalesModels.createSale();
    return result;
  },

  create: async (insertId, dados) => {
    const map = await Promise.all(dados.map(async (d) => {
      const results = await SalesModels.create(insertId, d);
      if (results.error) return results.error;
    }));
  return map;
  },

};

module.exports = SalesServices;