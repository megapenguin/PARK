const express = require("express");
const router = express.Router();
const Update = require("../models/Update");
const fileUpload = require("express-fileupload");
const randomString = require("randomstring");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.post("/insert", (req, res) => {
  console.log(req.body);

  let id = req.query;

  //User.destroy({ where: { i } }).then

  //User.update({ where: { id } });

  let { userId, firstName, lastName, contactNumber, email } = req.body;

  Update.create({
    userId,
    firstName,
    lastName,
    contactNumber,
    email,
  })
    .then((_res) => {
      res.json(_res);
      console.log(_res);
    })
    .catch((error) => console.log(error));
});

router.post("/delete", (req, res) => {
  let userId = req.body;
  Update.destroy({ where: { userId } }).then((_res) => {
    res.json(_res);
    console.log(res);
  });
});

router.post("/find", (req, res) => {
  console.log(req.body);

  let { userId } = req.body;

  Update.findOne({ where: { userId } })

    .then((_res) => {
      if (_res) {
        let {
          id,
          userId,
          firstName,
          lastName,
          contactNumber,
          email,
        } = _res.dataValues;
        res.json({
          id,
          userId,
          firstName,
          lastName,
          contactNumber,
          email,
        });
      } else {
        res.json(_res);
      }

      console.log(_res);
    })
    .catch((error) => console.log(error));
});

router.post("/updateusers", (req, res) => {
  let { userId, firstName, lastName, contactNumber, email } = req.body;
  console.log(req.body);

  Update.update(
    { firstName, lastName, contactNumber, email },
    { where: { userId } }
  )
    .then((_res) => {
      res.json(_res);
      console.log(_res);
    })
    .catch((error) => console.log(error));
});

module.exports = router;
