const { Router } = require("express");
const { body } = require("express-validator");

const { createUser, loginUser, renewToken } = require("../controllers/auth.controller");
const enforceValidations = require("../middlewares/enforceValidations");

const router = Router();

router.post("/new", [
  body("name").trim(),
  body("name", "Name is required").not().isEmpty(),
  body("email").trim().toLowerCase(),
  body("email", "Email is required").not().isEmpty(),
  body("email", "Invalid Email").isEmail(),
  enforceValidations
], createUser);
router.post("/", loginUser);
router.post("/renew", renewToken);

module.exports = router;
