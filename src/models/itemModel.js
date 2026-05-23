var database = require("../database/config");

function cadastrar(idItem, nomeItem, idPacote, idCliente) {


    var instrucaoSql = `INSERT INTO itens (idItem, nome, fkPacote, fkUsuario, status) VALUES ('${idItem}', '${nomeItem}','${idPacote}','${idCliente}', '${1}')`;

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

    return database.executar(instrucaoSql)
        .then(function (resposta) {
            var valorRecebido = resposta[0].quantidade;
            console.log(valorRecebido);
        })
        .catch(function (erro) {
            console.log(erro);
        })


}

function buscarItemPorId(idItem) {

    var instrucaoVerificarItem = `SELECT * FROM itens WHERE idItem = '${idItem}';`

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
    AtualizarStatusItem
};