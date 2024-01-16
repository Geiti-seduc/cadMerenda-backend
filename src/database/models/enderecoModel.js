const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Endereco = sequelize.define(
  'endereco',
  {
    endereco_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    cep: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    logradouro: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    numero: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bairro_distrito: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    municipio: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    uf: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    complemento: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    regiao_imediata: {
        type: DataTypes.STRING,
    },
    regiao_intermediaria: {
        type: DataTypes.STRING,
    },
  },
  {
    timestamps: true, // Adiciona os campos createdAt e updatedAt
    underscored: true, // Usa o formato snake_case para os nomes das colunas no banco de dados
  },
);

module.exports = Endereco;