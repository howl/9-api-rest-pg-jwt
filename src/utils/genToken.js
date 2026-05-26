const jwt = require("jsonwebtoken");

const genToken = (uid) => jwt.sign({ uid }, process.env.JWT_SECRET, { algorithm: 'HS512', expiresIn: "1h" });

module.exports = genToken;
