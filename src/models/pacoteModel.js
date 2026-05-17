var database = require("../database/config");

function cadastrar(idCliente, idPacote, nomePacote, idSala) {

    
    var instrucaoSql = `INSERT INTO pacotes (idPacote, nome, fkSala, fkUsuario) VALUES ('${idPacote}', '${nomePacote}','${idSala}','${idCliente}')`;

    console.log(instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPacotePorId(idPacote){

    var instrucaoVerificarPacote = `SELECT * FROM pacotes WHERE idPacote = ${idPacote};`

    return database.executar(instrucaoVerificarPacote);
}


module.exports = { cadastrar ,
    buscarPacotePorId
};