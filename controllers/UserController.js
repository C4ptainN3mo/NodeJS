const UserModel = require("../models").user;
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const index = async (req, res) => {
  try {
    const { keyword, id } = req.query;

    // cari data dengan nama arjuna atau id = 1
    const users = await UserModel.findAll({
      attributes: ["id", ["name", "nama"], "email", "status", "jenisKelamin"],
      where: {
        // [Op.or] : {
        //   name : name,
        //   id : 2
        // } // Or
        // name: {
        //   [Op.eq]: name,
        // },// jika hanya satu
        // name: {
        //   [Op.ne] : name
        // } // akan mencari selain nama yang dimasukkan
        // id: {
        //   [Op.gt] : id
        // } // lebih dari angka yang dimasukkan
        // name: {
        //   [Op.like] : '$una'
        // } // nama yang mendekati

        [Op.or]: [
          {
            name: {
              [Op.like]: `%${keyword}%`,
            },
          },
          {
            email: {
              [Op.like]: `%${keyword}%`,
            },
          },
          {
            jenisKelamin: {
              [Op.like]: `%${keyword}%`,
            },
          },
        ], // membuat search
      },
      offset: [], // mulai dari
      limit : [], // banyak data yang ditampilkan
      order : [['id', 'ASC']] // mengurutkan
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
    const { name } = req.body;
    const usersUpdate = await UserModel.findByPk(id);
    if (usersUpdate === null) {
      return res.json({
        status: "fail",
        msg: "there's no id like this, LMAO",
      });
    }
    await UserModel.update(
      {
        name: name,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return res.json({
      status: "Berhasil",
      messege: "User Berhasil Diupdate",
    });
  } catch (error) {
    console.log(error);

    return res.status(403).json({
      status: "fail",
      msg: "there's a mistake",
    });
  }
};

async function Createmany(req, res) {
  // payload.map(async (data) => {
  //   data.password = await bcrypt.hashSync(`${payload[i].password}`, 10);
  // })
  // res.json({
  //   data: payload,
  // });
  try {
    let { payload } = req.body;
    // payload.map((data) => {

    // })
    for (let i = 0; i < payload.length; i++) {
      payload[i].password = await bcrypt.hashSync(`${payload[i].password}`, 10);
    }
    // await UserModel.bulkCreate(payload);
    let countBerhasil = 0;
    let countGagal = 0;
    await Promise.all(
      payload.map(async (data) => {
        try {
          await UserModel.create(data);
          countBerhasil = countBerhasil + 1;
        } catch (error) {
          console.log(error);
          countGagal = countGagal + 1;
        }
      })
    );
    return res.status(201).json({
      status: "success",
      msg: "user berhasil ditemukan",
      status: `Berhasil menambah ${countBerhasil} dan gagal ${countGagal}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      status: "fail",
      msg: "there's a mistake",
    });
  }
}

module.exports = { index, detail, detailByEmail, destroy, update, Createmany };
