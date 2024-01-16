const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Modalidade = sequelize.define(
  'modalidade',
  {
    modalidade_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
  },
  {
    timestamps: true, // Adiciona os campos createdAt e updatedAt
    underscored: true, // Usa o formato snake_case para os nomes das colunas no banco de dados
  },
);

module.exports = Modalidade;