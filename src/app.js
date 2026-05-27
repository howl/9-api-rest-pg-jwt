const express = require("express");
const dbConnect = require("./utils/mongoConnect");

require("dotenv").config();

const PORT = process.env.PORT || 3000;
const URL_BASE = process.env.URL_BASE;

const app = express();

app.use(express.json());
app.use(express.urlencoded());

//dbConnect().catch((error) => { console.log(error) });

app.use(`${URL_BASE}/services`, require("./routes/services.route"));
app.use(`${URL_BASE}/auth`, require("./routes/auth.route"));

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
})
