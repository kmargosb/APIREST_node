const { pool } = require("../db.js");
const fs = require("fs-extra");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.homePage = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM piso");
    res.render("home", { rows });
    console.log(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Algo ha ocurrido",
    });
  }
};

exports.cPanel = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM piso");
    res.render("subir_productos", { rows });
  } catch (error) {
    return res.status(500).json({
      message: "Algo ha ocurrido",
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    console.log(req.params.id)
    const [rows] = await pool.query("SELECT * FROM piso WHERE id = ?", [
      req.params.id,
    ]);
    

    if (rows.length <= 0)
      return res.status(404).json({
        message: "Real State Not Found",
      });

    res.render('product', {rows});
  } catch (error) {
    return res.sendStatus(500).json({
      message: "Algo ha ocurrido",
    });
  }
};

exports.editProduct = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM piso WHERE id = ?", [req.params.id]);
    res.render("edit_product", { rows });
  } catch (error) {
    return res.status(500).json({
      message: "Algo ha ocurrido",
    });
  }
}

exports.createProducts = async (req, res) => {
  try {
    const { title, descrip, room, bath, price } = req.body;
    const result = await cloudinary.uploader.upload(req.file.path);
    const imageURL = result.url;
    const public_id = result.public_id;
    const [rows] = await pool.query(
      "INSERT INTO piso(title, descrip, room, bath, price, imageURL, public_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [title, descrip, room, bath, price, imageURL, public_id]
    );
    await fs.unlink(req.file.path);
    res.redirect("/");
  } catch (error) {
    return res.status(500).json({
      message: "Algo ha ocurrido",
    });
  }
};

exports.updateProducts = async (req, res) => {
  const { id } = req.params;
  const { title, descrip, room, bath, price } = req.body;

  try {
    const [result] = await pool.query(
      "UPDATE piso SET title = IFNULL(?, title), descrip = IFNULL(?, descrip), room = IFNULL(?, room), bath = IFNULL(?, bath), price = IFNULL(?, price) WHERE id = ?",
      [title, descrip, room, bath, price, id]
    );
    console.log(result);

    if (result.affectedRows === 0)
      return res.status(404).json({
        message: "Piso no encontrado",
      });

      
    // const [rows] = await pool.query("SELECT * FROM piso WHERE id = ?", [id]);
    // console.log(rows)
    // res.redirect('/')
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      messaje: "Algo ha ocurrido",
    });
  }
};

exports.deleteProducts = async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM piso WHERE id = ?", [req.params.id]);
    // await cloudinary.v2.uploader.destroy(req.params.public_id);    
    

    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: "Piso no encontrado",
      });
    } else {
      res.status(204).end();

      // res.redirect("/subir_productos");      
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      messaje: "Algo ha ocurrido",
    });
  }
};
