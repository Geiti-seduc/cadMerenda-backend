const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Fornecedor = sequelize.define(
  'fornecedor',
  {
    fornecedor_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    cnpj: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    razao_social: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nome_fantasia: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    inscricao_estadual: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cnae: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    responsavel_tecnico: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  },
  {
    timestamps: true, // Adiciona os campos createdAt e updatedAt
    underscored: true, // Usa o formato snake_case para os nomes das colunas no banco de dados
  },
);

module.exports = Fornecedor;