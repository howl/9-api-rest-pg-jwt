const { Router } = require("express");
const { check } = require("express-validator");

const { getServices, getServiceById, addService, updateServiceById, deleteServiceById } = require("../controllers/services.controller");
const validateInputs = require("../middlewares/validateInputs");

const router = Router();

router.get("/", getServices);
router.get("/:id", getServiceById);
router.post("/", [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
  check('precio', 'El precio es obligatorio').not().isEmpty(),
  validateInputs
], addService);
router.put("/:id", updateServiceById);
router.delete("/:id", deleteServiceById);

module.exports = router;
