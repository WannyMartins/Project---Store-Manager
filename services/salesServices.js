const Joi = require('joi');
const SalesModels = require('../models/salesModels');

const SalesServices = {
  validateBody: ([data]) => {
    const schema = Joi.object({
      productId: Joi.number().integer().positive().required(),
      quantity: Joi.number().integer().positive().required(),
    });

    const { error, value } = schema.validate(data);

    if (error) {
      error.status = 400;
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

  delete: async (id) => {
    if (typeof id !== 'number' || id <= 0 || id === undefined) return false;

    const sale = await SalesModels.delete(Number(id));
    if (!sale) return false;
    return { id };
  },

  create: async (dados) => {
    if (dados.quantity < 1) {
      const e = new Error('"quantity" must be greater than or equal to 1');
      e.status = 422;
      throw e;
    }

    const sale = await SalesModels.create(dados);
      
  return sale;
  },

};

module.exports = SalesServices;