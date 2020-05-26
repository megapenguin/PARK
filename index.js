const express = require("express");
const app = express();
const cors = require("cors");
const user = require("./router/user");
const auth = require("./router/auth");
const provider = require("./router/provider");
const transaction = require("./router/transaction");
const update = require("./router/update");
const sequelize = require("./config/database");
const fileUpload = require("express-fileupload");
const randomString = require("randomstring");
require("dotenv").config();

const PORT = process.env.PORT || 8000;
// sequelize.on("error", () => console.log("connection error:"));

// sequelize.once("open", () => console.log("Database Connected"));

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
app.use("/api/auth", auth);
app.use("/api/users", user);
// app.use("/api/user", require("./routes/user"));
app.use("/api/providers", provider);
app.use("/api/transactions", transaction);
app.use("/api/updates", update);

// app.listen(8000, () => console.log("Server running at port 8000"));
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
