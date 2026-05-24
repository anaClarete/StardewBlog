var database = require("../database/config");

function cadastrar(idCliente, idSala, nomeSala) {
    
    var instrucaoSql = `INSERT INTO salas (idSala, nome, fkUsuario) VALUES ('${idSala}', '${nomeSala}', '${idCliente}')`;

    console.log(instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarSalaPorId(idSala){

    var instrucaoVerificarSala = `SELECT * FROM salas WHERE idSala = ${idSala};`
    return database.executar(instrucaoVerificarSala);
}

function buscarSalaPorIdEPorUsuario(idSala, idUsuario){

    var instrucaoVerificarSala = `SELECT * FROM salas WHERE idSala = ${idSala} and fkUsuario = ${idUsuario};`
    return database.executar(instrucaoVerificarSala);
}

module.exports = { 
    cadastrar,
    buscarSalaPorId,
    buscarSalaPorIdEPorUsuario
};