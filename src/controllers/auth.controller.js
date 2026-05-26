const createUser = (req, res) => {
  res.status(405).json({
    ok: false,
    msg: "User creation actually uninplemented"
  });
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
