const express = require('express');
const {
  homePage,
  cPanel,
  getProduct,
  editProduct,
  createProducts,
  updateProducts,
  deleteProducts,
} = require('../controllers/productos.controller');

const router = express.Router();

router.get('/', homePage);

router.get('/subir_productos', cPanel);

router.get('/product/:id', getProduct);

router.get('/edit_product/:id', editProduct);

router.post('/subir_productos', createProducts);

router.patch('/upload_product/:id', updateProducts);

router.delete('/delete_product/:id', deleteProducts); // no me funciona con la peticion http delete

module.exports = router;
