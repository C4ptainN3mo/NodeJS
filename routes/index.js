const express = require("express");
const router = express.Router();
const UserModel = require("../models").user;
const bcrypt = require('bcrypt');
router.get("/", (req, res) => {
  res.send({ status: "ok" });
});

router.post("/register", async (req, res) => {
  try {
    let body = req.body;
    body.password =  await bcrypt.hashSync(body.password, 10);
    const users = await UserModel.create(body)
    console.log(users)
    res.json({
      status: "succes",
      msg: "Register berhasil",
      data: body,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
