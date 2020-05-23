const express = require("express");
const app = express();
const cors = require("cors");
const user = require("./router/user");
const provider = require("./router/provider");
const transaction = require("./router/transaction");
const update = require("./router/update");
const sequelize = require("./config/database");
const fileUpload = require("express-fileupload");
const randomString = require("randomstring");

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(fileUpload());

app.use("/api/users", user);
app.use("/api/providers", provider);
app.use("/api/transactions", transaction);
app.use("/api/updates", update);

app.listen(8000, () => console.log("Server running at port 8000"));
