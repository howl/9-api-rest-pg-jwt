const pool = require("../utils/pgConnect");
const { queriesUser } = require("./queries.postgres");

const findById = async (id) => {
  let client, result;
  try {
    client = await pool.connect();
    const data = await client.query(queriesUser.getUserById, [id]);

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
    const data = await client.query(queriesUser.getUserByEmail, [email]);

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
    const data = await client.query(queriesUser.addUser, [name, email, password]);

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
