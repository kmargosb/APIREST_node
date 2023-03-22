import { pool } from "../db.js";
// import { imageBase64 } from "../db.js";

export const getProducts = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM piso");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Algo ha ocurrido",
    });
  }
};
export const getProduct = async (req, res) => {
  try {
    // console.log(req.params.id)
    const [rows] = await pool.query("SELECT * FROM piso WHERE id = ?", [
      req.params.id,
    ]);

    if (rows.length <= 0)
      return res.status(404).json({
        message: "Real State Not Found",
      });

    res.json(rows[0]);
  } catch (error) {
    return res.sendStatus(500).json({
      message: "Algo ha ocurrido",
    });
  }
};
export const createProducts = async (req, res) => {
  try {
    const { title, descrip, room, bath, price } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO piso(title, descrip, room, bath, price) VALUES (?, ?, ?, ?, ?)",
      [title, descrip, room, bath, price]
    );
    res.send({
      id: rows.insertId,
      title,
      descrip,
      room,
      bath,
      price,
      // imagen,
    });
    // res.redirect('/')
  } catch (error) {
    return res.sendStatus(500).json({
      message: "Algo ha ocurrido",
    });
  }
};
export const updateProducts = async (req, res) => {
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

    const [rows] = await pool.query("SELECT * FROM piso WHERE id = ?", [id]);

    res.json(rows[0]);
    // res.redirect('/')
  } catch (error) {
    return res.sendStatus(500).json({
      messaje: "Algo ha ocurrido",
    });
  }
};
export const deleteProducts = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM piso WHERE id = ?", [
      req.params.id,
    ]);
    // console.log(result)

    if (result.affectedRows <= 0)
      return res.status(404).json({
        message: "Piso no encontrado",
      });

    res.sendStatus(204);
    // res.redirect('/')
  } catch (error) {
    return res.sendStatus(500).json({
      messaje: "Algo ha ocurrido",
    });
  }
};
