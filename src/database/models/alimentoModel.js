const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Alimento = sequelize.define(
  'alimento',
  {
    alimento_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    alimento_nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    alimento_descricao: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    alimento_medida: {
        type: DataTypes.STRING,
        allowNull: true,
    },
  },
  {
    timestamps: true, // Adiciona os campos createdAt e updatedAt
    underscored: true, // Usa o formato snake_case para os nomes das colunas no banco de dados
  },
);

module.exports = Alimento;