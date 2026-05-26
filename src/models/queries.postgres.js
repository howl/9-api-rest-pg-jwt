const queries = {
  getUserByEmail: "SELECT 1 FROM users WHERE email = $1;",
  addUser: "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING name, email, creation_date;",
  getServices: 'SELECT * FROM servicios;',
  getServiceById: 'SELECT * FROM servicios WHERE id = $1;',
  addService: 'INSERT INTO servicios (titulo, descripcion, categoria) VALUES ($1, $2, $3) RETURNING *;',
  updateServiceById: 'UPDATE servicios SET titulo = $2, descripcion = $3, categoria = $4 WHERE id = $1 RETURNING *;',
  deleteServiceById: 'DELETE FROM servicios WHERE id = $1 RETURNING *;'
};

module.exports = queries;
