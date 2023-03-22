import express from "express";
import productosRoutes from "./routes/productos.routes.js";
import indexRoutes from "./routes/index.routes.js";

const app = express();

app.use(express.json()); // asi el proyecto puede ver la respuesta en json

app.use(indexRoutes);
app.use(productosRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    message: "La pagina que intentas buscar no existe",
  });
});

export default app;
