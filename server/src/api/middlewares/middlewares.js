
const loggerURL = (req, res, next) => {
    let fecha = new Date();
    console.log(`[${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}] ${req.method} ${req.url}`);
    
    next(); 
};

const validateId = (req, res, next) => {
    const id = Number(req.params.id); 

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            error: "El id debe ser un numero entero positivo"
        });
    }

    req.id = id;

    next(); 
}

const validateProduct = (req, res, next) => {

    const { name, brand, price, stock, line_id, image_url } = req.body;

    const errores = [];

    if (name === undefined || brand === undefined || price === undefined || stock === undefined || line_id === undefined) {
        errores.push("Faltan campos obligatorios");
    }

    if (typeof name !== "string" || name.trim().length < 2 || name.length > 100) {
        errores.push("El nombre debe ser texto, tener entre 2 and 100 caracteres.");
    }

    if (brand && (typeof brand !== "string" || brand.length > 50)) {
        errores.push("La marca debe ser texto y no superar los 50 caracteres.");
    }

    if (typeof price !== "number" || price <= 0) {
        errores.push("El precio debe ser un número mayor a 0.");
    }

    if (typeof stock !== "number" || !Number.isInteger(stock) || stock < 0) {
        errores.push("El stock debe ser un número entero mayor o igual a 0.");
    }

    const lineasValidas = [1, 2];
    if (!lineasValidas.includes(line_id)) {
        errores.push("Línea inválida. Debe ser 1 (marron) o 2 (gris).");
    }

    if (image_url && (typeof image_url !== "string" || image_url.length > 255)) {
        errores.push("La URL de la imagen no puede superar los 255 caracteres.");
    }

    if (errores.length > 0) {
        return res.status(400).json({
            message: "Datos inválidos para el producto", 
            errores
        });
    }

    next();
};

const validateUser = (req, res, next) => {
  const { name, mail, type_id } = req.body;

  const errores = [];

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    errores.push("Nombre inválido");
  }

  if (!mail || typeof mail !== "string") {
    errores.push("Mail inválido");
  }

  if (type_id === undefined || type_id === null) {
    errores.push("type_id es obligatorio");
  } else if (!Number.isInteger(type_id) || type_id <= 0) {
    errores.push("type_id debe ser un número válido");
  }

  if (errores.length > 0) {
    return res.status(400).json({ message: "Datos inválidos", errores });
  }

  next();
};

export {
    loggerURL,
    validateId,
    validateProduct,
    validateUser
}