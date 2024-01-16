const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Proposta_Fornecedor = sequelize.define(
  'proposta_fornecedor',
  {
    proposta_fornecedor_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    preco: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    custosAdicionais: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
  },
  {
    timestamps: true, // Adiciona os campos createdAt e updatedAt
    underscored: true, // Usa o formato snake_case para os nomes das colunas no banco de dados
  },
);

module.exports = Proposta_Fornecedor;