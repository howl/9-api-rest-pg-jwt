const { pool } = require("../utils/pgConnect");
const { queriesService } = require("./queries.postgres");

const find = async () => {
  let client, result;
  try {
    client = await pool.connect();
    const data = await client.query(queriesService.getServices);

    result = data.rows;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    client.release();
  }
  return result;
};

const findById = async (id) => {
  let client, result;
  try {
    client = await pool.connect();
    const data = await client.query(queriesService.getServiceById, [id]);

    result = data.rows;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    client.release();
  }
  return (result.length) ? result : null;
};

const save = async (entry) => {
  const { nombre: titulo, descripcion, categoria } = entry;
  let client, result;
  try {
    client = await pool.connect();
    const data = await client.query(queriesService.addService, [titulo, descripcion, categoria]);

    result = data.rows;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    client.release();
  }
  return result;
};

const findByIdAndUpdate = async (id, entry) => {
  const { nombre: titulo, descripcion, categoria } = entry;
  let client, result;
  try {
    client = await pool.connect();
    const data = await client.query(queriesService.updateServiceById, [id, titulo, descripcion, categoria]);

    result = data.rows;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    client.release();
  }
  return (result.length) ? result : null;
};

const findByIdAndDelete = async (id) => {
  let client, result;
  try {
    client = await pool.connect();
    const data = await client.query(queriesService.deleteServiceById, [id]);

    result = data.rows;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    client.release();
  }
  return (result.length) ? result : null;
};

module.exports = { find, findById, save, findByIdAndUpdate, findByIdAndDelete };
