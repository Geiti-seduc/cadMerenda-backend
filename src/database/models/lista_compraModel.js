const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Lista_Compra = sequelize.define(
  'lista_compra',
  {
    lista_compra_id: {
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

module.exports = Lista_Compra;