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

};

module.exports = SalesServices;