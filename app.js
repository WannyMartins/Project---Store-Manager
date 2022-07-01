const express = require('express');

const ProductsControllers = require('./controllers/productsControllers');
// const SalesController = require('./controllers/salesControllers');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (req, res) => {
  res.send();
});

app.get('/products/:id', ProductsControllers.getById);
// app.put('/products/:id', ProductController.update);
app.get('/products', ProductsControllers.getAll);
app.post('/products', ProductsControllers.create);
// app.post('/sales', SalesController.createSales);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;