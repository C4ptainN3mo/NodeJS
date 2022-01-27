const bcrypt = require("bcrypt");
const ProductModel = require("../models").ProductKu;
const product = async (req, res) => {
  try {
    let body = req.body;
    const product = await ProductModel.create(body);
    console.log(product);
    res.status(201).json({
      status: "succes",
      msg: "Register produk berhasil",
      data: body,
    });
  } catch (error) {
    console.log(error);
  }
  res.sendStatus(422);
};

module.exports = { product };
