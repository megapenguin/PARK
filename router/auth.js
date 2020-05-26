const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/", validateToken, (req, res) => {
  let decode = req.decode;

  let token = jwt.sign({ decode }, process.env.PRIVATE_KEY, {
    expiresIn: "15m",
  });

  return res.json({ token, userData: decode });
});

router.post("/login", (req, res) => {
  let { userName, password } = req.body;
  console.log(req.body);
  User.findOne({ where: { userName } }).then((user) => {
    if (user === null) return res.sendStatus(422);
    // console.log(user);

    bcrypt.compare(password, user.password, (err, status) => {
      console.log(err, status);
      if (status === false) return res.sendStatus(422);
      //dahil kailangan mo ng id sa code mo ipasa narin natin ang id
      if (user.userStatus == "ADMIN") {
        myStatus = "admin";
      } else {
        myStatus = "home";
      }

      let userPayload = {
        id: user.id,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        contactNumber: user.contactNumber,
        userStatus: user.userStatus,
        myStatus,
      };
      console.log(userPayload);
      let token = jwt.sign(userPayload, process.env.PUBLIC_KEY, {
        expiresIn: "8h",
      });
      jwt.verify(token, process.env.PUBLIC_KEY, (error, decode) => {
        if (error) {
          console.log(error);
          return res.sendStatus(403);
        }

        let secureToken = jwt.sign({ decode }, process.env.PRIVATE_KEY, {
          expiresIn: "15m",
        });
        res.json({ token, userData: userPayload, secureToken });
      });
    });
  });
});

function validateToken(req, res, next) {
  let authHeader = req.headers["authorization"];

  if (!authHeader) return res.sendStatus(403);

  let token = authHeader.split(" ")[1];

  if (!token) return res.sendStatus(403);

  jwt.verify(token, process.env.PUBLIC_KEY, (error, decode) => {
    if (error) return res.sendStatus(403);
    req.decode = decode;
    next();
    console.log(authHeader);
  });
}

module.exports = router;
