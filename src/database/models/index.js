const { sequelize } = require('../config/db');
const { defineRelationships } = require('./relationships');

const User = require('./userModel');
const Escola = require('./escolaModel');
const Endereco = require('./enderecoModel');
const Gee = require('./geeModel');
const Fornecedor = require('./fornecedorModel');
const Modalidade = require('./modalidadeModel');
const Escola_Modadlidade = require('./escola_modalidadeModel');
const Alimento = require('./alimentoModel');
const Lista_Compra = require('./lista_compraModel');
const Proposta_Fornecedor = require('./proposta_fornecedorModel');
const Lista_Produto = require('./lista_produtoModel');
const Escola_User = require('./escola_userModel');
const Certidao = require('./certidaoModel');
const schoolModel = require('./schoolModel');
const userModel = require('./userModel');


defineRelationships();

// Associa todos os modelos de uma vez
function syncModels() {
    return sequelize.sync();
}

module.exports = {
    User,
    Escola,
    Endereco,
    Gee,
    Fornecedor,
    Modalidade,
    Escola_Modadlidade,
    Alimento,
    Lista_Compra,
    Proposta_Fornecedor,
    Lista_Produto,
    Escola_User,
    Certidao,
    syncModels,
    sequelize,
    schoolModel,
    userModel,
};