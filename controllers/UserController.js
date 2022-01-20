const UserModel = require("../models").user;
const index = async (req, res) => {
  try {
    const users = await UserModel.findAll({
      attributes: ["id", "name", "email", "status", "jenisKelamin"],
    });
    console.log(users);
    return res.json({
      status: "succes",
      msg: "find them",
      data: users,
    });
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      status: "fail",
      msg: "there's a mistake",
    });
  }
};

const detail = async (req, res) => {
  try {
    const { id } = req.params;

    const users = await UserModel.findByPk(id);
    if (users === null) {
      return res.status(403).json({
        status: "fail",
        msg: "there's no id like this",
      });
    }
    return res.json({
      status: "succes",
      msg: "find it",
      data: users,
    });
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      status: "fail",
      msg: "there's a mistake",
    });
  }
};

module.exports = { index, detail };
