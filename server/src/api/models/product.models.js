import connection from "../db/db.js";



const selectAllProducts = () => {
  const sql = `
    SELECT 
      p.id,
      p.name, 
      p.brand, 
      p.price, 
      p.stock, 
      p.image_url,
      p.created_at,
      l.name AS line_id
    FROM products p
    INNER JOIN product_lines l ON p.line_id = l.id   
    WHERE p.state = 1
  `;

  return connection.query(sql);
}


const selectProductById = (id) => {
  // const sql = "SELECT id, name, brand, price, stock, line_id, state_id, image_url FROM products WHRE products.id = ?";
  const sql = `
    SELECT 
      p.id,
      p.name, 
      p.brand, 
      p.price, 
      p.stock, 
      p.state,
      p.image_url,
      p.created_at,
      l.name AS line_id
    FROM products p
    INNER JOIN product_lines l ON p.line_id = l.id   
    WHERE p.id = ? AND p.state = 1
  `;
  return connection.query(sql, [id]);
}


const consultStock = (id) => {

  const sql = `
    SELECT stock 
    FROM products
    WHERE id = ?
  `;

  return connection.query(sql, [id]);
}

const insertNewProduct = (name, brand, price, stock, line_id, image_url) => {
  const sql = "INSERT INTO products (name, brand, price, stock, line_id, image_url) VALUES (?, ?, ?, ?, ?, ?)";

  return connection.query(sql, [name, brand, price, stock, line_id, image_url]);
}


const updateProduct = (name, brand, price, stock, line_id, image_url, id) => {
  const sql = "UPDATE products SET name = ?, brand = ?, price = ?, stock = ?, line_id = ?, image_url = ?, id = ? WHERE id = ?";

  return connection.query(sql, [name, brand, price, stock, line_id, image_url, id]);
}


const deleteProduct = (id) => {
  const sql = "UPDATE products SET state_id = FALSE WHERE id = ?";

  return connection.query(sql, [id]);
}



export default {
  selectAllProducts,
  selectProductById,
  insertNewProduct,
  updateProduct,
  deleteProduct,
  consultStock,
}