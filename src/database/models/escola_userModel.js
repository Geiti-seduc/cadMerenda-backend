const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const escola_user = sequelize.define(
  'escola_user',
  {
    escola_user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true, // Adiciona os campos createdAt e updatedAt
    underscored: true, // Usa o formato snake_case para os nomes das colunas no banco de dados
  },
);

module.exports = escola_user;