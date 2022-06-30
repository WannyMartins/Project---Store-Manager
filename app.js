const express = require('express');

const ProductController = require('./controllers/productsControllers');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (req, res) => {
  res.send();
});

app.get('/products/:id', ProductController.getById);
app.get('/products', ProductController.getAll);
app.post('/products', ProductController.createProduct);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;