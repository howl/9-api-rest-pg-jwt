const { validationResult } = require("express-validator");

const enforceValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(403).json({
      ok: false,
      errors: errors.mapped()
    });
  }

  next();
}

module.exports = enforceValidations;
