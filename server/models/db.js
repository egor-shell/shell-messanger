const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('postgres://postgres:root@localhost:5432/shell_messenger')

sequelize
    .authenticate()
    .then(() => console.log('Connected'))
    .catch((e) => console.log(e))

module.exports = sequelize