const express = require('express');
const rescue = require('express-rescue');

const ProductsControllers = require('./controllers/productsControllers');
const SalesController = require('./controllers/salesControllers');
const middlewareError = require('./middlewares/error');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (req, res) => {
  res.send();
});

app.delete('/products/:id', rescue(ProductsControllers.delete));
app.put('/products/:id', rescue(ProductsControllers.update));
app.get('/products/search', rescue(ProductsControllers.search));
app.get('/products/:id', rescue(ProductsControllers.getById));
app.get('/products', rescue(ProductsControllers.getAll));
app.post('/products', rescue(ProductsControllers.create));

app.delete('/sales/:id', rescue(SalesController.delete));
app.get('/sales/:id', rescue(SalesController.getById));

app.put('/sales/:id', rescue(SalesController.edite));
app.get('/sales', rescue(SalesController.getAll));
app.post('/sales', rescue(SalesController.create));

app.use(middlewareError);
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;