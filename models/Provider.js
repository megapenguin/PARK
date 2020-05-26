const Sequelize = require("sequelize");
const db = require("../config/database");

const Provider = db.define("providers", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  personalAddress: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  parkingLotName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  parkingLotLocation: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  vehicleType: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  mobileNumber: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  parkingPrice: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  totalSlots: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  reservedSlots: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  providerStatus: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  parkingLotPicture: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  parkingLotStatus: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

module.exports = Provider;
