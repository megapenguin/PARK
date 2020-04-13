const express = require("express");
const router = express.Router();
const Provider = require("../models/Provider");
const fileUpload = require("express-fileupload");
const randomString = require("randomstring");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.get("/getverifiedproviders", (req, res) => {
  const providerStatus = "verified";
  console.log(providerStatus);
  Provider.findAll({
    where: {
      providerStatus: {
        [Op.like]: providerStatus
      }
    }
  })
    .then(_res => {
      res.json(_res);
      console.log(res);
    })
    .catch(error => console.log(error));
});

router.post("/searchproviders", (req, res) => {
  const status = "verified";
  let { providerId, firstName, lastName } = req.body;
  console.log(firstName);
  console.log(status);
  Provider.findAll({
    where: {
      [Op.and]: [
        {
          providerStatus: {
            [Op.like]: status
          }
        },
        {
          [Op.or]: [
            {
              id: {
                [Op.like]: providerId
              }
            },
            {
              firstName: {
                [Op.like]: "%" + firstName + "%"
              }
            },
            {
              lastName: {
                [Op.like]: "%" + lastName + "%"
              }
            }
          ]
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

router.get("/getunverifiedproviders", (req, res) => {
  const providerStatus = "unverified";
  console.log(providerStatus);
  Provider.findAll({
    where: {
      providerStatus: {
        [Op.like]: providerStatus
      }
    }
  })
    .then(_res => {
      res.json(_res);
      console.log(res);
    })
    .catch(error => console.log(error));
});

router.post("/updateprovider", (req, res) => {
  let {
    id,
    firstName,
    lastName,
    vehicleType,
    mobileNumber,
    parkingPrice,
    totalSlots,
    parkingLotStatus,
    providerStatus
  } = req.body;
  console.log(req.body);

  Provider.update(
    {
      firstName,
      lastName,
      vehicleType,
      mobileNumber,
      parkingPrice,
      totalSlots,
      parkingLotStatus,
      providerStatus
    },
    { where: { id } }
  )
    .then(_res => {
      res.json(_res);
      console.log(_res);
    })
    .catch(error => console.log(error));
});

router.post("/insertprovider", (req, res) => {
  console.log(req.body);

  let id = req.query;

  //User.destroy({ where: { i } }).then

  //User.update({ where: { id } });

  let {
    userId,
    firstName,
    lastName,
    personalAddress,
    parkingLotName,
    parkingLotLocation,
    vehicleType,
    mobileNumber,
    parkingPrice,
    totalSlots,
    reservedSlots,
    providerStatus,
    parkingLotPicture,
    parkingLotStatus
  } = req.body;

  Provider.create({
    userId,
    firstName,
    lastName,
    personalAddress,
    parkingLotName,
    parkingLotLocation,
    vehicleType,
    mobileNumber,
    parkingPrice,
    totalSlots,
    reservedSlots,
    providerStatus,
    parkingLotPicture,
    parkingLotStatus
  })
    .then(_res => {
      res.json(_res);
      console.log(_res);
    })
    .catch(error => console.log(error));
});

router.post("/searchprovider", (req, res) => {
  console.log(req.body);

  let { userId, firstName, lastName } = req.body;

  Provider.findOne({ where: { userId, firstName, lastName } })

    .then(_res => {
      if (_res) {
        let {
          id,
          userId,
          firstName,
          lastName,
          personalAddress,
          parkingLotName,
          parkingLotLocation,
          vehicleType,
          mobileNumber,
          parkingPrice,
          totalSlots,
          reservedSlots,
          providerStatus,
          parkingLotPicture,
          parkingLotStatus
        } = _res.dataValues;
        res.json({
          id,
          userId,
          firstName,
          lastName,
          personalAddress,
          parkingLotName,
          parkingLotLocation,
          vehicleType,
          mobileNumber,
          parkingPrice,
          totalSlots,
          reservedSlots,
          providerStatus,
          parkingLotPicture,
          parkingLotStatus
        });
      } else {
        res.json(_res);
      }

      console.log(_res);
    })
    .catch(error => console.log(error));
});

router.post("/searchparkinglot", (req, res) => {
  console.log(req.id);

  let { id } = req.body;

  Provider.findOne({ where: { id } })

    .then(_res => {
      if (_res) {
        let {
          id,
          userId,
          firstName,
          lastName,
          personalAddress,
          parkingLotName,
          parkingLotLocation,
          vehicleType,
          mobileNumber,
          parkingPrice,
          totalSlots,
          reservedSlots,
          providerStatus,
          parkingLotPicture,
          parkingLotStatus
        } = _res.dataValues;
        res.json({
          id,
          userId,
          firstName,
          lastName,
          personalAddress,
          parkingLotName,
          parkingLotLocation,
          vehicleType,
          mobileNumber,
          parkingPrice,
          totalSlots,
          reservedSlots,
          providerStatus,
          parkingLotPicture,
          parkingLotStatus
        });
      } else {
        res.json(_res);
      }

      console.log(_res);
    })
    .catch(error => console.log(error));
});

router.post("/searchparking/:parkingLotLocation", (req, res) => {
  console.log(req.params.parkingLotLocation);

  const parkingLotLocation = req.params.parkingLotLocation;
  console.log(parkingLotLocation);
  Provider.findAll({
    where: {
      parkingLotLocation: {
        [Op.like]: "%" + parkingLotLocation + "%"
      }
    }
  })
    .then(_res => {
      res.json(_res);
      console.log(res);
    })
    .catch(error => console.log(error));
});

//Uploading Parking Pictures
router.post("/uploadParkingPict/:id", (req, res) => {
  console.log(req.params.id);
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded!" });
  }
  const parkingPictureFile = req.files.parkingPictureFile;
  const randomFileName = randomString.generate(15);
  const splitFile = parkingPictureFile.name.split(".");

  parkingPictureFile.mv(
    `${__dirname}/../client/public/uploads/${randomFileName}.${splitFile[1]}`,
    err => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      res.json({
        fileName: parkingPictureFile.name,
        filePath: `/uploads/${randomFileName}.${splitFile[1]}`
      });
    }
  );
});

module.exports = router;
