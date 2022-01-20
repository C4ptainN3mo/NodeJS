const express = require("express");
const router = express.Router();
const validationRegister = require("../validator/authValidator");
const validationMiddleWare = require("../middleware/validationMiddleWare");
const { register } = require("../controllers/AuthController");
const { index, detail } = require("../controllers/UserController");
router.get("/", (req, res) => {
  res.send({ status: "ok" });
});

router.post("/register", validationRegister, validationMiddleWare, register);

// users

router.get("/users", index);
router.get("/users/:id", detail);
module.exports = router;
