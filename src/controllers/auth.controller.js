const bcrypt = require("bcryptjs");

const User = require("../models/user.postgres");
const genToken = require("../utils/genToken");

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (await User.findByEmail(email))
      return res.status(409).json({
        ok: false,
        msg: `Email ${email} already used, try "forget my password" if you don't remember it`
      });

    const user = await User.save({ name, email, password: await bcrypt.hash(password, 12) });

    const token = genToken(user.id);

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

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);

    if (!user)
      return res.status(404).json({
        ok: false,
        msg: "No users with that email",
      });

    if (!await bcrypt.compare(password, user.password))
      return res.status(401).json({
        ok: false,
        msg: "Wrong password"
      });

    delete user.password;

    const token = genToken(user.id);

    delete user.id;

    res.status(200).json({
      ok: true,
      msg: 'User logged in',
      user: user,
      token: token
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: `Server error trying to login user with email ${email}`
    });
  }
};

const renewToken = async (req, res) => {
  try {
    const user = await User.findById(req.uid);

    if (!user)
      return res.status(404).json({
        ok: false,
        msg: "No such uid",
      });

    const token = genToken(user.id);

    res.status(200).json({
      ok: true,
      msg: "Token renewed",
      user,
      token
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: `Server error renewing token for uid ${req.uid}`
    });
  }
};

module.exports = {
  createUser, loginUser, renewToken
};
