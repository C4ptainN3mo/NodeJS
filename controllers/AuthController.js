const bcrypt = require("bcrypt");
const UserModel = require("../models").user;
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const register = async (req, res) => {
  try {
    let body = req.body;
    body.password = await bcrypt.hashSync(body.password, 10);
    const users = await UserModel.create(body);
    console.log(users);
    res.status(201).json({
      status: "success",
      msg: "Register berhasil",
      data: body,
    });
  } catch (error) {
    console.log(error);
  }
  res.sendStatus(422);
};

const login = async (req, res) => {
  // check email
  // check kecocokan email dan password
  try {
    const { email, password } = req.body;
    const users = await UserModel.findOne({
      where: {
        email: email,
      },
    });
    if (users === null) {
      return res.status(422).json({
        status: "fail",
        msg: "there's no email like this, LMAO",
      });
    }
    const verified = bcrypt.compareSync(password, users.password);
    if (!verified) {
      return res.status(422).json({
        status: "fail",
        msg: "Your password is wrong",
      });
    }

    const token = jwt.sign(
      {
        id: users.id,
        email: users.email,
      },
      process.env.JWT_ACCESS_TOKEN,
      { expiresIn: "1h" }
    );
    return res.json({
      status: "succes",
      msg: "You are logged in",
      token: token,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { register, login };
