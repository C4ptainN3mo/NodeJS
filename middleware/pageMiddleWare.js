function pageMiddleWare(req, res, next) {
  let { page, pageSize } = req.query;
  let { orderBy, sortBy } = req.query;
  if (sortBy === undefined || orderBy === undefined) {
    (req.query.orderBy = "asc"), (req.query.sortBy = "id");
  }

  page = (page - 1) * pageSize;

  req.query.page = parseFloat(page);
  req.query.pageSize = parseFloat(pageSize);

  console.log(page, pageSize, "text");
  if (
    page === undefined ||
    pageSize === undefined ||
    page == "" ||
    pageSize == ""
  ) {
    delete req.query.page;
    delete req.query.pageSize;
    return next();
  }

  next();
}

module.exports = pageMiddleWare;
