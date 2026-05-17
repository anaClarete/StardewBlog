var database = require("../database/config");

function cadastrar(idItem, nomeItem, idPacote, idCliente) {

    
    var instrucaoSql = `INSERT INTO itens (idItem, nome, fkPacote, fkUsuario, status) VALUES ('${idItem}', '${nomeItem}','${idPacote}','${idCliente}', '${1}')`;

    console.log(instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarItemPorId(idItem){

    var instrucaoVerificarItem = `SELECT * FROM itens WHERE idItem = ${idItem};`

    return database.executar(instrucaoVerificarItem);
}

function atualizarStatus(idItem){
    var instrucaoAtualizarStatusItem = ``
}

module.exports = { cadastrar ,
    buscarItemPorId
};