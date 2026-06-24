import connection from "../db/db.js";

const insertNewUser = (name, mail, type_id) => {
  const sql = "INSERT INTO users (name, mail, type_id) VALUES (?, ?, ?)";

  return connection.query(sql, [name, mail, type_id]);
}


export default {
  insertNewUser,
}