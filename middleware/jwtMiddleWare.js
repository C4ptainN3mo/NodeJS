const jwtMiddleWare = (req, res, next) => {
  return res.json({
    data: req.headers,
  });
};

module.exports = jwtMiddleWare