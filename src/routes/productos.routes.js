const express = require('express');
const {
  homePage,
  cPanel,
  getProduct,
  createProducts,
  updateProducts,
  deleteProducts,
} = require('../controllers/productos.controller');

const router = express.Router();

router.get('/', homePage);

router.get('/subir_productos', cPanel);

router.get('/product/:id', getProduct);

router.post('/subir_productos', createProducts);

router.patch('/edit/:id', updateProducts);

router.get('/delete_product/:id', deleteProducts);

module.exports = router;
