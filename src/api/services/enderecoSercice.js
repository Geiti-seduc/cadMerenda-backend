const Endereco = require('../../database/models/enderecoModel');

const getEnderecos = async () => {
    const enderecos = await Endereco.findAll();
    return enderecos;
};

const getEnderecoBy = async (id) => {
    const endereco = await Endereco.findByPk(id);
    return endereco;
};

const createEndereco = async (dadosEndereco) => {
    const {
        cep,
        logradouro,
        numero,
        bairro_distrito,
        municipio,
        uf,
        complemento,
        regiao_imediata,
        regiao_intermediaria,
    } = dadosEndereco;
    const newEndereco = Endereco.create({
        cep,
        logradouro,
        numero,
        bairro_distrito,
        municipio,
        uf,
        complemento,
        regiao_imediata,
        regiao_intermediaria,
    });
    return newEndereco;
};

module.exports = {
    getEnderecos,
    getEnderecoBy,
    createEndereco,
};