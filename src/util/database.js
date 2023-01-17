const Sequelize = require("sequelize")

const sequelize = new Sequelize("test", "postgres", "santhosh123", {
    dialect : "postgres",
    host : "localhost"
});

module.exports = sequelize;