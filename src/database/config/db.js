const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('cad_merenda', 'root', 'senha-mysql', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = {
    sequelize,
};