const express = require("express");
const router = express.Router();
const User = require("../models/User");
const fileUpload = require("express-fileupload");
const randomString = require("randomstring");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const someOtherPlaintextPassword = "not_bacon";

router.get("/", (req, res) => {
  User.findAll()
    .then((_res) => {
      res.json(_res);
    })
    .catch((error) => console.log(error));

  User.findOne({ where: { id: 1 } });
});

router.post("/delete", (req, res) => {
  let { id } = req.body;
  console.log(id);
  User.destroy({ where: { id } }).then((_res) => {
    res.json(_res);
    console.log(res);
  });
});

router.post("/register", (req, res) => {
  let { id } = req.query;
  let {
    firstName,
    lastName,
    contactNumber,
    email,
    userName,
    password,
    profilePicture,
    idFront,
    idBack,
    idWithSelfie,
    userStatus,
  } = req.body;

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      // Store hash in your password DB.
      if (err) return res.sendStatus(500);

      User.create({
        firstName,
        lastName,
        contactNumber,
        email,
        userName,
        password: hash,
        profilePicture,
        idFront,
        idBack,
        idWithSelfie,
        userStatus,
      })
        .then((_res) => {
          res.json(_res);
          console.log(_res);
        })
        .catch((error) => console.log(error));
    });
  });
});

router.post("/insert", (req, res) => {
  console.log(req.body);

  let id = req.query;

  //User.destroy({ where: { i } }).then

  //User.update({ where: { id } });

  let {
    firstName,
    lastName,
    contactNumber,
    email,
    userName,
    password,
    profilePicture,
    idFront,
    idBack,
    idWithSelfie,
    userStatus,
  } = req.body;

  User.create({
    firstName,
    lastName,
    contactNumber,
    email,
    userName,
    password,
    profilePicture,
    idFront,
    idBack,
    idWithSelfie,
    userStatus,
  })
    .then((_res) => {
      res.json(_res);
      console.log(_res);
    })
    .catch((error) => console.log(error));
});

router.get("/getverifiedusers", (req, res) => {
  const status = "verified";
  console.log(status);
  User.findAll({
    where: {
      userStatus: {
        [Op.like]: status,
      },
    },
  })
    .then((_res) => {
      res.json(_res);
      console.log(res);
    })
    .catch((error) => console.log(error));
});

router.post("/searchusers", (req, res) => {
  const status = "verified";
  let { userId, firstName, lastName } = req.body;
  console.log(firstName);
  console.log(status);
  User.findAll({
    where: {
      [Op.and]: [
        {
          userStatus: {
            [Op.like]: status,
          },
        },
        {
          [Op.or]: [
            {
              id: {
                [Op.like]: userId,
              },
            },
            {
              firstName: {
                [Op.like]: "%" + firstName + "%",
              },
            },
            {
              lastName: {
                [Op.like]: "%" + lastName + "%",
              },
            },
          ],
        },
      ],
    },
  })
    .then((_res) => {
      res.json(_res);
      console.log(res);
    })
    .catch((error) => console.log(error));
});

router.get("/getunverifiedusers", (req, res) => {
  const status1 = "unverified";
  const status2 = "";
  User.findAll({
    where: {
      [Op.or]: [
        {
          userStatus: {
            [Op.like]: status1,
          },
        },
        {
          userStatus: {
            [Op.like]: status2,
          },
        },
      ],
    },
  })
    .then((_res) => {
      res.json(_res);
      console.log(res);
    })
    .catch((error) => console.log(error));
});

router.post("/updateusers", (req, res) => {
  let { id, firstName, lastName, contactNumber, email } = req.body;
  console.log(req.body);

  User.update({ firstName, lastName, contactNumber, email }, { where: { id } })
    .then((_res) => {
      res.json(_res);
      console.log(_res);
    })
    .catch((error) => console.log(error));
});

router.post("/approveusers", (req, res) => {
  let { id, firstName, lastName, contactNumber, email, userStatus } = req.body;
  console.log(req.body);

  User.update(
    { firstName, lastName, contactNumber, email, userStatus },
    { where: { id } }
  )
    .then((_res) => {
      res.json(_res);
      console.log(_res);
    })
    .catch((error) => console.log(error));
});

router.post("/updateProfile", (req, res) => {
  let { id, profilePicture } = req.body;
  console.log(req.body);

  User.update({ profilePicture }, { where: { id } })
    .then((_res) => {
      res.json(_res);
      console.log(_res);
    })
    .catch((error) => console.log(error));
});

router.post("/userprofilepicture", (req, res) => {
  let { id } = req.body;
  console.log(req.body);

  User.findOne({ where: { id } })
    .then((_res) => {
      res.json(_res);
      console.log(_res);
    })
    .catch((error) => console.log(error));
});

router.post("/verificationRequest", (req, res) => {
  let { id, idFront, idBack, idWithSelfie, userStatus } = req.body;
  console.log(req.body);

  User.update({ idFront, idBack, idWithSelfie, userStatus }, { where: { id } })
    .then((_res) => {
      res.json(_res);
      console.log(_res);
    })
    .catch((error) => console.log(error));
});

router.get("/get", (req, res) => {
  User.findAll()
    .then((_res) => {
      res.json(_res);
    })
    .catch((error) => console.log(error));
});
router.post("/login", (req, res) => {
  console.log(req.body);

  let { userName, password } = req.body;

  User.findOne({ where: { userName, password } })

    .then((_res) => {
      if (_res) {
        let {
          id,
          firstName,
          lastName,
          contactNumber,
          email,
          userName,
          profilePicture,
          idFront,
          idBack,
          idWithSelfie,
          userStatus,
        } = _res.dataValues;
        res.json({
          id,
          firstName,
          lastName,
          contactNumber,
          email,
          userName,
          profilePicture,
          idFront,
          idBack,
          idWithSelfie,
          userStatus,
        });
      } else {
        res.json(_res);
      }

      console.log(_res);
    })
    .catch((error) => console.log(error));
});

router.post("/search", (req, res) => {
  console.log(req.body);

  let { userName, id } = req.body;

  User.findOne({ where: { userName, id } })

    .then((_res) => {
      if (_res) {
        let {
          id,
          firstName,
          lastName,
          contactNumber,
          email,
          userName,
          profilePicture,
          idFront,
          idBack,
          idWithSelfie,
          userStatus,
        } = _res.dataValues;
        res.json({
          id,
          firstName,
          lastName,
          contactNumber,
          email,
          userName,
          profilePicture,
          idFront,
          idBack,
          idWithSelfie,
          userStatus,
        });
      } else {
        res.json(_res);
      }

      console.log(_res);
    })
    .catch((error) => console.log(error));
});

//Uploading Picture Functions :D

router.post("/uploadProfilePict/:id", (req, res) => {
  console.log(req.params.id);
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded!" });
  }
  const file = req.files.file;

  const randomFileName = randomString.generate(15);
  const splitFile = file.name.split(".");

  file.mv(
    `${__dirname}/../client/public/uploadprofile/${randomFileName}.${splitFile[1]}`,
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      res.json({
        fileName: file.name,
        filePath: `/uploadprofile/${randomFileName}.${splitFile[1]}`,
      });
    }
  );
  console.log(file.filePath);
});

router.post("/uploadidfront/:id", (req, res) => {
  console.log(req.params.id);
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded!" });
  }
  const idFrontFile = req.files.idFrontFile;

  const randomFileName = randomString.generate(15);
  const splitFile = idFrontFile.name.split(".");

  idFrontFile.mv(
    `${__dirname}/../client/public/uploadfront/${randomFileName}.${splitFile[1]}`,
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      res.json({
        fileName: idFrontFile.name,
        filePath: `/uploadfront/${randomFileName}.${splitFile[1]}`,
      });
    }
  );
  // console.log(idFrontFile.filePath);
});

router.post("/uploadidback/:id", (req, res) => {
  console.log(req.params.id);
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded!" });
  }
  const idBackFile = req.files.idBackFile;

  const randomFileName = randomString.generate(15);
  const splitFile = idBackFile.name.split(".");

  idBackFile.mv(
    `${__dirname}/../client/public/uploadback/${randomFileName}.${splitFile[1]}`,
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      res.json({
        fileName: idBackFile.name,
        filePath: `/uploadback/${randomFileName}.${splitFile[1]}`,
      });
    }
  );
  // console.log(idFrontFile.filePath);
});

router.post("/uploadidwithselfie/:id", (req, res) => {
  console.log(req.params.id);
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded!" });
  }
  const idWithSelfieFile = req.files.idWithSelfieFile;

  const randomFileName = randomString.generate(15);
  const splitFile = idWithSelfieFile.name.split(".");

  idWithSelfieFile.mv(
    `${__dirname}/../client/public/uploadselfie/${randomFileName}.${splitFile[1]}`,
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      res.json({
        fileName: idWithSelfieFile.name,
        filePath: `/uploadselfie/${randomFileName}.${splitFile[1]}`,
      });
    }
  );
  // console.log(idFrontFile.filePath);
});

module.exports = router;
