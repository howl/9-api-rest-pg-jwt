const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1] || "";
  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const minsToExpire = Math.ceil((payload.exp - Math.floor(new Date().getTime() / 1000)) / 60);
    if (minsToExpire > 5)
      return res.status(412).json({ message: `Token renew only happens when there is 5 minutes or less to expire, actually ${minsToExpire} minutes left` });

    req.uid = payload.uid;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
