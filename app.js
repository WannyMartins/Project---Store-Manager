const express = require('express');

const ProductsControllers = require('./controllers/productsControllers');
const SalesController = require('./controllers/salesControllers');
const error = require('./middlewares/error');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (req, res) => {
  res.send();
});

app.delete('/products/:id', ProductsControllers.delete);
app.delete('/sales/:id', SalesController.delete);
app.put('/products/:id', ProductsControllers.update);
// app.put('/sales/:id', SalesController.edite);
app.get('/products/search', ProductsControllers.search);
app.get('/products/:id', ProductsControllers.getById);
app.get('/products', ProductsControllers.getAll);
app.get('/sales/:id', SalesController.getById);
app.post('/sales', SalesController.create);

app.get('/sales', SalesController.getAll);

app.post('/products', ProductsControllers.create);

app.use(error);
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;