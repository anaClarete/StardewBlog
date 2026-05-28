var database = require("../database/config");

function cadastrar(idItem, nomeItem, idPacote, idCliente) {


    var instrucaoSql = `INSERT INTO itens (idItem, nome, fkPacote, fkUsuario) VALUES ('${idItem}', '${nomeItem}','${idPacote}','${idCliente}')`;

    console.log("Entrei no model do entregar item");
    console.log(instrucaoSql);
    return database.executar(instrucaoSql);
}


function pegarItensPeloIdUsuario(idUsuario) {

    var instrucaoSql = `SELECT
                        s.nome, 
                        COUNT(DISTINCT i.idItem, i.fkUsuario) AS quantidade
                        FROM itens i
                        JOIN pacotes p
                            ON i.fkPacote = p.idPacote
                        JOIN salas s
                            ON p.fkSala = s.idSala
                        AND i.fkUsuario = ${idUsuario}
                        GROUP BY s.nome;`;

    return database.executar(instrucaoSql);
}

function buscarItemPorId(idItem, idCliente) {

    var instrucaoVerificarItem = `SELECT * FROM itens WHERE idItem = '${idItem}' AND fkUsuario = '${idCliente}';`

    return database.executar(instrucaoVerificarItem);
}

function verificarStatusItem(idItem) {
    var instrucaoVerificarStatusItem = `SELECT status FROM itens WHERE idItem = ${idItem}`;

    return database.executar(instrucaoVerificarStatusItem);
}

function AtualizarStatusItem(idItem, valorStatus) {
    var instrucaoAtualizarStatusItem = `UPDATE itens SET status = ${valorStatus} WHERE idItem = ${idItem};`;

    return database.executar(instrucaoAtualizarStatusItem);
}

module.exports = {
    cadastrar,
    buscarItemPorId,
    verificarStatusItem,
    AtualizarStatusItem,
    pegarItensPeloIdUsuario
};