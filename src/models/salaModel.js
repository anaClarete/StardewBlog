var database = require("../database/config");

function cadastrar(idCliente, idSala, nomeSala) {
    
    var instrucaoSql = `INSERT INTO salas (idSala, nome, fkUsuario) VALUES ('${idSala}', '${nomeSala}', '${idCliente}')`;

    return database.executar(instrucaoSql);
}

function buscarSalaPorId(idSala){

    var instrucaoVerificarSala = `SELECT * FROM salas WHERE idSala = ${idSala};`

    return database.executar(instrucaoVerificarSala);
}

module.exports = { cadastrar,
    buscarSalaPorId
};