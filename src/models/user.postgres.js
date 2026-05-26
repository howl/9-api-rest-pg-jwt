const { Pool } = require("pg");
const queries = require("./queries.postgres");

const pool = new Pool({
  host: process.env.PG_DB_HOST,
  user: process.env.PG_DB_USER,
  password: process.env.PG_DB_PASSWORD,
  database: process.env.PG_DB_NAME
});

const findById = async (id) => {
  let client, result;
  try {
    client = await pool.connect();
    const data = await client.query(queries.getUserById, [id]);

    result = data.rowCount ? data.rows[0] : null;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    client.release();
  }
  return result;
};

const findByEmail = async (email) => {
  let client, result;
  try {
    client = await pool.connect();
    const data = await client.query(queries.getUserByEmail, [email]);

    result = data.rowCount ? data.rows[0] : null;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    client.release();
  }
  return result;
};

const save = async (entry) => {
  const { name, email, password } = entry;
  let client, result;
  try {
    client = await pool.connect();
    const data = await client.query(queries.addUser, [name, email, password]);

    result = data.rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    client.release();
  }
  return result;
};

module.exports = { findById, findByEmail, save };
