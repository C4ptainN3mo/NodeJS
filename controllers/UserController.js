const UserModel = require("../models").ProductKu;
const index = async (req, res) => {
  try {
    const users = await UserModel.findAll({
      attributes: ["id", "kodeProduk", "namaProduk", "jumlah", "hargaSatuan"],
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

const detailByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const users = await UserModel.findOne({
      where: {
        email: email,
      },
    });
    if (users === null) {
      return res.status(200).json({
        status: "fail",
        msg: "there's no email like this, LMAO",
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

const destroy = async (req, res) => {
  const { id } = req.params;

  const users = await UserModel.destroy({
    where: {
      id: id,
    },
  });

  if (users === 0) {
    return res.status(403).json({
      status: "fail",
      msg: "there's no id like this",
    });
  }
  return res.json({
    status: "succes",
    msg: "destroy it",
  });
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { namaProduk, hargaSatuan, jumlah,name } = req.body;
    const usersUpdate = await UserModel.findByPk(id);
    if (usersUpdate === null) {
      return res.json({
        status: "fail",
        msg: "there's no id like this, LMAO",
      });
    }
    await UserModel.update(
      {
        namaProduk,
        hargaSatuan,
        jumlah
      },
      {
        where: {
          id: id,
        },
      }
    );
    return res.json({
      status: "Berhasil",
      messege: "Produk Berhasil Diupdate",
    });
  } catch (error) {
    console.log(error);
    console.log(error);
    return res.status(403).json({
      status: "fail",
      msg: "there's a mistake",
    });
  }
};

module.exports = { index, detail, detailByEmail, destroy, update };
