const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Lista_Produto = sequelize.define(
  'lista_produto',
  {
    lista_produto_id: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    qtd: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true, // Adiciona os campos createdAt e updatedAt
    underscored: true, // Usa o formato snake_case para os nomes das colunas no banco de dados
  },
);

module.exports = Lista_Produto;