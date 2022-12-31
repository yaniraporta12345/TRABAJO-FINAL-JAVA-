const express = require("express");
var cors = require('cors');
const mongoose = require("mongoose");
require("dotenv").config();
const userRoute = require("./routes/user");

const app = express();
const port = 9000;

// mongodb connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error(error));
app.use(cors())
app.use(express.json());
app.use("/api", userRoute);

let sumar = (a, b) => {
  return a + b;
};

app.get("/", (req, res) => {
  let rpta = sumar(200, 500);
  res.send(`${rpta}`);
});

app.listen(port, () => {
  console.log(`El sevidor se esta ejecutando en http://localhost:${port}`);
});
