const UserModel = require("../models").ProductKu;
const { check } = require("express-validator");
const validationRegister = [
  check("kodeProduk")
  .custom((value) => {
    return UserModel.findOne({ where: { kodeProduk: value } }).then((user) => {
      if (user) return Promise.reject("Product Code has been used");
    });
  }),
  check("namaProduk").isLength({ min: 1 }).withMessage("Nama wajib di isi"),
  check("jumlah").isLength({ min: 1 }).withMessage("Nama wajib di isi"),
  check("hargaSatuan").isLength({ min: 1 }).withMessage("Nama wajib di isi"),
];

module.exports = validationRegister;
