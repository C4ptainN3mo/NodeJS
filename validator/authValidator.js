const UserModel = require("../models").user;
const { check } = require("express-validator");
const validationRegister = [
    check("name").isLength({ min: 1 }).withMessage("Nama wajib di isi"),
    check("email")
      .isEmail()
      .withMessage("Gunakan Email Valid")
      .custom((value) => {
        return UserModel.findOne({ where: { email: value } }).then((user) => {
          if (user) {
            return Promise.reject("E-mail sudah digunakan");
          }
        });
      }),
    check("password")
      .isLength({ min: 8 })
      .withMessage("Password wajib 8 karakter"),
    check("status")
      .isIn(["active", "nonactive"])
      .withMessage("Status tidak valid"),
    check("jenisKelamin")
      .isIn(["laki-laki", "perempuan"])
      .withMessage("Kelamin tidak valid"),
]

module.exports = validationRegister