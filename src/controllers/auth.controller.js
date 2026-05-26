const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user.postgres");

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (await User.findByEmail(email)) {
      return res.status(409).json({
        ok: false,
        msg: `Email ${email} already used, try "forget my password" if you don't remember it`
      });
    }

    const user = await User.save({ name, email, password: await bcrypt.hash(password, 12) });

    const token = jwt.sign({ uid: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    delete user.id;

    res.status(201).json({
      ok: true,
      msg: "User registration completed",
      user,
      token
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: `Server error trying to register new user email ${email}`
    });
  }
};

const loginUser = (req, res) => {
  res.status(405).json({
    ok: false,
    msg: "User login actually uninplemented"
  });
};

const renewToken = (req, res) => {
  res.status(405).json({
    ok: false,
    msg: "Token renew actually uninplemented"
  });
};

module.exports = {
  createUser, loginUser, renewToken
};
