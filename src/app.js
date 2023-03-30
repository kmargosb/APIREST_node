const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const exphbs = require('express-handlebars');
const productosRoutes = require('./routes/productos.routes');
const indexRoutes = require('./routes/index.routes');



const app = express();

// Settings
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.create({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
}).engine);
app.set('view engine', '.hbs');



// Middlewares
app.use(express.json()); // proyecto ve la respuesta en json
app.use(express.urlencoded({extended:false})); // proyecto ve datos de formularios
app.use(morgan('dev'));
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/uploads'),
  filename: function(req, file, cb) {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  }
})
app.use(multer({storage}).single('image'));

// Routes
app.use(indexRoutes);
app.use(productosRoutes);
app.use(function(req, res, next) {
  res.status(404).json({
    message: "La pagina que intentas buscar no existe",
  });
});

module.exports = app;
