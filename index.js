const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const router = require("./routes/index");
const port = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`server berjalan di ${port}`);
});
