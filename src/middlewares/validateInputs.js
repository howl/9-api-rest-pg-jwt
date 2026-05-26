const { validationResult } = require("express-validator");

const validateInputs = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(403).json({
      ok: false,
      errores: errors.mapped()
    })
  }

  next();
}

module.exports = validateInputs
