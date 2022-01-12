const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 8000;
app.get("/", (req, res) => {
  res.send("welcome");
});

app.listen(port, () => {
  console.log(`server berjalan di ${port}`);
});
