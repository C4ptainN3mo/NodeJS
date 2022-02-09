const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const userModel = require("../models").user;

const jwtMiddleWare = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  if (authorization === undefined) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.JWT_ACCESS_TOKEN, async (err, decode) => {
    if (err) {
      return res.status(401).json({
        status: "fail",
        msg: "invalid",
        data: err,
      });
    } else {
      const user = await userModel.findOne({
        where: {
          email: decode?.email,
        },
      });
      if (user == null) {
        return res.status(422).json({
          status: "fail",
          msg: "there is no you in here",
        });
      }
      req.id = decode?.id;
      req.email = decode?.email;
      console.log("cokkkkkkk" ,req.email)
      next();
    }
  });
};

module.exports = jwtMiddleWare;
