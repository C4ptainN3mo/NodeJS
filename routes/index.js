const express = require("express");
const router = express.Router();
const validationRegister = require("../validator/authValidator");
const validationMiddleWare = require("../middleware/validationMiddleWare");
const { product } = require("../controllers/AuthController");
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

router.post("/product", validationRegister, validationMiddleWare,  product);

// users

router.get("/productDetail", index);
router.get("/product/:id", detail);
router.delete("/product/:id", destroy);
router.put("/product/update/:id", update);

module.exports = router;
