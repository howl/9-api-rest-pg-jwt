const { Router } = require("express");
const { body } = require("express-validator");

const { createUser, loginUser, renewToken } = require("../controllers/auth.controller");
const enforceValidations = require("../middlewares/enforceValidations");
const verifyToken = require("../middlewares/verifyToken");

const router = Router();

router.post("/new", [
  body("name").trim(),
  body("name", "Name required").not().isEmpty(),
  body("email").trim().toLowerCase(),
  body("email", "Email required").not().isEmpty(),
  body("email", "Invalid Email").isEmail(),
  body("password", "Password required with at least 8 characters with 1 lower case letter, 1 upper case letter, 1 number and 1 symbol")
    .isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }),
  enforceValidations
], createUser);
router.post("/", [
  body("email").trim().toLowerCase(),
  body("email", "Email required").not().isEmpty(),
  body("email", "Invalid Email").isEmail(),
  body("password", "Password must be at least 8 characters")
    .isStrongPassword({ minLength: 8, minLowercase: 0, minUppercase: 0, minNumbers: 0, minSymbols: 0 }),
  enforceValidations
], loginUser);
router.post("/renew", verifyToken, renewToken);

module.exports = router;
