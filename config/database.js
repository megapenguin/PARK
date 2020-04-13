const Sequelize = require("sequelize");

const sequelize = new Sequelize("park", "root", "", {
  host: "localhost",
  dialect: "mysql",
  timezone: "+08:00",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = sequelize;
