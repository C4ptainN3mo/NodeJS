const express = require("express");
const router = express.Router();
const validationRegister = require("../validator/authValidator");
const validationMiddleWare = require("../middleware/validationMiddleWare");
const jwtMiddleWare = require("../middleware/jwtMiddleWare");
const { register, login } = require("../controllers/AuthController");
const {
  index,
  detail,
  detailByEmail,
  destroy,
  update,
} = require("../controllers/UserController");
router.get("/", (req, res) => {
  res.send({ status: "ok" });
});

router.post("/register", validationRegister, validationMiddleWare, register);
router.post("/login", login);
// users
router.use(jwtMiddleWare);
router.get("/users", index);
router.get("/users/:id", detail);
router.get("/users/email/:email", detailByEmail);
router.delete("/users/:id", destroy);
router.put("/users/update/:id", update);

module.exports = router;
