const Sequelize = require("sequelize");
sequelize = new Sequelize('Biblioteca','root','mysqluser',
{
    host:'localhost',
    dialect:'mysql'
})

module.exports = {
    Sequelize,
    sequelize
}