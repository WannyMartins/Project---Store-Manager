const SalesModels = require('../models/salesModels');

const SalesServices = {
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

};

module.exports = SalesServices;