const Sequelize = require("sequelize");
const db = require("../config/database");

const User = db.define("users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  contactNumber: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  userName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  profilePicture: {
    type: Sequelize.STRING,
    allowNull: false
  },
  idFront: {
    type: Sequelize.STRING,
    allowNull: false
  },
  idBack: {
    type: Sequelize.STRING,
    allowNull: false
  },
  idWithSelfie: {
    type: Sequelize.STRING,
    allowNull: false
  },
  userStatus: {
    type: Sequelize.STRING,
    allowNull: false
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false
  }
});

module.exports = User;
