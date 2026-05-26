const { Router } = require("express");
const { body } = require("express-validator");

const { createUser, loginUser, renewToken } = require("../controllers/auth.controller");
const validateInputs = require("../middlewares/validateInputs");

const router = Router();

router.post("/new", [
  body('name', 'Name is required').not().isEmpty().trim(),
  body('email', 'Email is required').isEmail().trim().toLowerCase(),
  validateInputs
], createUser);
router.post("/", loginUser);
router.post("/renew", renewToken);

module.exports = router;
