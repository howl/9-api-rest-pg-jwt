require("dotenv").config();
const { Pool } = require("pg");

console.log("Env variables: ", process.env.PG_DB_HOST, process.env.PG_DB_USER, process.env.PG_DB_PASSWORD, process.env.PG_DB_NAME);

const pool = new Pool({
  host: process.env.PG_DB_HOST,
  user: process.env.PG_DB_USER,
  password: process.env.PG_DB_PASSWORD,
  database: process.env.PG_DB_NAME,
  idleTimeoutMillis: 3000
});

pool.connect((err, client, release) => {
  if (err)
    return console.error("❌ Error connecting to the Postgres Database", err.stack);

  client.query("SELECT NOW()", (err, result) => {
    release();
    if (err) {
      return console.error("Error executing query", err.stack);
    }
    console.log("✔️  Connection to the Postgres Database sucessful", result.rows);
  });
});
