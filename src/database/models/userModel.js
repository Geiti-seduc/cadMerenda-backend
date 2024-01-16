const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define(
  'user',
  {
    user_cpf: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cargo: {
      type: DataTypes.STRING,
      allowNull: false, // A chave defaultValue é usada para definir um valor padrão para uma coluna em um modelo do Sequelize.
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true, // Adiciona os campos createdAt e updatedAt
    underscored: true, // Usa o formato snake_case para os nomes das colunas no banco de dados
  },
);

module.exports = User;
