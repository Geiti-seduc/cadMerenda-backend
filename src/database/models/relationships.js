// const Exemple = require('./exempleModel');
const Endereco = require('./enderecoModel');
const Gee = require('./geeModel');
const Escola_User = require('./escola_userModel');
const Escola = require('./escolaModel');
const User = require('./userModel');
const Fornecedor = require('./fornecedorModel');
const Modalidade = require('./modalidadeModel');
const Escola_Modadlidade = require('./escola_modalidadeModel');
const Alimento = require('./alimentoModel');
const Lista_Compra = require('./lista_compraModel');
const Proposta_Fornecedor = require('./proposta_fornecedorModel');
const Lista_Produto = require('./lista_produtoModel');

// Relacionamentos com Endereço
function relationGeeEndereco() {
    Endereco.hasOne(Gee, {
        foreignKey: 'endereco_id',
    });
    Gee.belongsTo(Endereco, {
        foreignKey: 'endereco_id',
    });
}
function relationEscolaEndereco() {
    Endereco.hasOne(Escola, {
        foreignKey: 'endereco_id',
    });
    Escola.belongsTo(Endereco, {
        foreignKey: 'endereco_id',
    });
}

function relationUserFornecedor() {
    User.hasOne(Fornecedor, {
        foreignKey: 'user_id',
    });
    Fornecedor.belongsTo(User, {
        foreignKey: 'user_id',
    });
}

function relationEscolaModalide() {
    Escola_Modadlidade.belongsTo(Escola, {
        foreignKey: 'escola_inep',
    });
    Escola_Modadlidade.belongsTo(Modalidade, {
        foreignKey: 'modalidade_id',
    });
    Escola.hasMany(Escola_Modadlidade, {
        foreignKey: 'escola_inep',
    });
    Modalidade.hasMany(Escola_Modadlidade, {
        foreignKey: 'modalidade_id',
    });
}

function relationEscolaUser() {
    Escola_User.belongsTo(Escola, {
        foreignKey: 'escola_inep',
    });
    Escola_User.belongsTo(User, {
        foreignKey: 'user_id',
    });
    Escola.hasMany(Escola_User, {
        foreignKey: 'escola_inep',
    });
    User.hasMany(Escola_User, {
        foreignKey: 'user_id',
    });
}

function relationModalidadeAlimento() {
    Lista_Compra.belongsTo(Alimento, {
        foreignKey: 'alimento_id',
    });
    Lista_Compra.belongsTo(Modalidade, {
        foreignKey: 'modalidade_id',
    });
    Alimento.hasMany(Lista_Compra, {
        foreignKey: 'alimento_id',
    });
    Modalidade.hasMany(Lista_Compra, {
        foreignKey: 'modalidade_id',
    });
}

function relationAlimentoEscola() {
    Lista_Produto.belongsTo(Alimento, {
        foreignKey: 'alimento_id',
    });
    Lista_Produto.belongsTo(Escola, {
        foreignKey: 'escola_inep',
    });
    Alimento.hasMany(Lista_Produto, {
        foreignKey: 'alimento_id',
    });
    Escola.hasMany(Lista_Produto, {
        foreignKey: 'escola_inep',
    });
}

function relationEscolaFornecedor() {
    Proposta_Fornecedor.belongsTo(Escola, {
        foreignKey: 'escola_inep',
    });
    Proposta_Fornecedor.belongsTo(Fornecedor, {
        foreignKey: 'fornecedor_id',
    });
    Escola.hasMany(Proposta_Fornecedor, {
        foreignKey: 'escola_inep',
    });
    Fornecedor.hasMany(Proposta_Fornecedor, {
        foreignKey: 'fornecedor_id',
    });
}

function relationPropostaFornecedorListaProduto() {
    Proposta_Fornecedor.belongsTo(Lista_Produto, {
        foreignKey: 'lista_produto_id',
    });
    Lista_Produto.hasMany(Proposta_Fornecedor, {
        foreignKey: 'lista_produto_id',
    });
}

function defineRelationships() { 
    relationGeeEndereco();
    relationEscolaUser();
    relationEscolaEndereco();
    relationUserFornecedor();
    relationEscolaModalide();
    relationModalidadeAlimento();
    relationAlimentoEscola();
    relationEscolaFornecedor();
    relationPropostaFornecedorListaProduto();
}

module.exports = { 
    defineRelationships,
};