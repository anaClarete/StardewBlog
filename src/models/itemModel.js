var database = require("../database/config");

function cadastrar(idItem, nomeItem, idPacote, idCliente) {


    var instrucaoSql = `INSERT INTO itens (idItem, nome, fkPacote, fkUsuario, status) VALUES ('${idItem}', '${nomeItem}','${idPacote}','${idCliente}', '${1}')`;

    console.log("Entrei no model do entregar item");
    console.log(instrucaoSql);
    return database.executar(instrucaoSql);
}

function listar(idUsuario, idSala) {

    var instrucaoSql = `SELECT 
                        COUNT(*) AS quantidade
                        FROM itens i
                        JOIN pacotes p 
                            ON i.fkPacote = p.idPacote
                        JOIN usuario u 
                            ON i.fkUsuario = u.idUsuario
                        WHERE p.fkSala = ${idSala}
                        AND i.status = 1
                        AND i.fkUsuario = ${idUsuario};`;

    return database.executar(instrucaoSql);
}

function getTFullItensByUserID(idUsuario) {

    var instrucaoSql = `SELECT
                        s.nome, 
                        COUNT(DISTINCT i.idItem, i.fkUsuario) AS quantidade
                        FROM itens i
                        JOIN pacotes p
                            ON i.fkPacote = p.idPacote
                        JOIN salas s
                            ON p.fkSala = s.idSala
                        WHERE i.status = 1
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
    listar,
    buscarItemPorId,
    verificarStatusItem,
    AtualizarStatusItem,
    getTFullItensByUserID
};