const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const fileUpload = require("express-fileupload");
const randomString = require("randomstring");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.get("/gettransactions", (req, res) => {
  Transaction.findAll()
    .then(_res => {
      res.json(_res);
      console.log(res);
    })
    .catch(error => console.log(error));
});

router.post("/searchtransactions", (req, res) => {
  let { transactionId, providerId, userId, vehiclePlatenumber } = req.body;
  console.log(vehiclePlatenumber);
  Transaction.findAll({
    where: {
      [Op.or]: [
        {
          id: {
            [Op.like]: transactionId
          }
        },
        {
          userId: {
            [Op.like]: userId
          }
        },
        {
          providerId: {
            [Op.like]: providerId
          }
        },
        {
          vehiclePlatenumber: {
            [Op.like]: "%" + vehiclePlatenumber + "%"
          }
        }
      ]
    }
  })
    .then(_res => {
      res.json(_res);
      console.log(res);
    })
    .catch(error => console.log(error));
});

router.post("/inserttransaction", (req, res) => {
  console.log(req.body);

  let id = req.query;

  //User.destroy({ where: { i } }).then

  //User.update({ where: { id } });

  let { providerId, userId, vehiclePlatenumber } = req.body;

  Transaction.create({
    providerId,
    userId,
    vehiclePlatenumber
  })
    .then(_res => {
      res.json(_res);
      console.log(_res);
    })
    .catch(error => console.log(error));
});

router.post("/searchtransactions/:userId", (req, res) => {
  console.log(req.params.userId);

  const userId = req.params.userId;
  console.log(userId);
  Transaction.findAll({
    where: {
      userId: userId
    }
  })
    .then(_res => {
      res.json(_res);
      console.log(res);
    })
    .catch(error => console.log(error));
});

router.get("/get", (req, res) => {
  Transaction.findAll()
    .then(_res => {
      res.json(_res);
    })
    .catch(error => console.log(error));
});

module.exports = router;
