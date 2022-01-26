const UserModel = require("../models").user;
const { check } = require("express-validator");
const validationRegister = [
  check("kodeProduk").isLength({ min: 1 }).withMessage("Nama wajib di isi"),
  check("namaProduk").isLength({ min: 1 }).withMessage("Nama wajib di isi"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password wajib 8 karakter"),
  check("status")
    .isIn(["active", "nonactive"])
    .withMessage("Status tidak valid"),
  check("jenisKelamin")
    .isIn(["laki-laki", "perempuan"])
    .withMessage("Kelamin tidak valid"),
];

module.exports = validationRegister;
