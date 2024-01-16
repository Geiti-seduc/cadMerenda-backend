const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Certidao = sequelize.define(
  'certidao',
  {
    certidao_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    certidao_nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    certidao_vencimento: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    certidao_arquivo: {
        type: DataTypes.BLOB,
        allowNull: false,
    },
  },
  {
    timestamps: true, // Adiciona os campos createdAt e updatedAt
    underscored: true, // Usa o formato snake_case para os nomes das colunas no banco de dados
  },
);

module.exports = Certidao;