import userModels from "../models/user.models.js";

export const createUser = async (req, res) => {

  try {
    console.log(req.body);

    const { name,mail, type_id} = req.body;

    const [rows] = await userModels.insertNewUser(name, mail, type_id);

    res.status(201).json({
      message: "User creado con exito",
      productId: rows.insertId
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error interno del servidor"
    });
  }
}
