const bcrypt = require("bcrypt");
const UserModel = require("../models").user;
const register = async (req, res) => {
  try {
    let body = req.body;
    body.password = await bcrypt.hashSync(body.password, 10);
    const users = await UserModel.create(body);
    console.log(users);
    res.status(201).json({
      status: "succes",
      msg: "Register berhasil",
      data: body,
    });
  } catch (error) {
    console.log(error);
  }
  res.sendStatus(422);
};

module.exports = { register };
