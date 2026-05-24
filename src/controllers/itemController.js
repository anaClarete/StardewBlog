var itemModel = require("../models/itemModel");
var salaModel = require("../models/salaModel");
var pacoteModel = require("../models/pacoteModel");

function listar(req, res) {
    var idUsuario = req.params.idUsuario;
    var idSala = req.params.idSala;
    itemModel.listar(idUsuario, idSala).then(function (resultado) {
        let valor = resultado[0].quantidade;
        //console.log(valor);

        // precisamos informar que o resultado voltará para o front-end como uma resposta em json
        res.status(200).json(valor);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })

    
}

function listarCERTO(req, res) {
    var idUsuario = req.params.idUsuario;
    // var idSala = req.params.idSala;
    itemModel.getTFullItensByUserID(idUsuario).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })

    
}

async function entregarItem(req, res) {
    let dados = req.body;
    let idCliente = dados['id_cliente'];
    let dadosSala = dados['dados_sala'];
    let dadosPacote = dados['dados_pacote'];
    let dadosItem = dados['dados_item'];

    let idSala = dadosSala['id'];
    let nomeSala = dadosSala['nome'];
    let idPacote = dadosPacote['id'];
    let nomePacote = dadosPacote['nome'];
    let idItem = dadosItem['id'];
    let nomeItem = dadosItem['nome'];

    console.log("Entrei no controller do entregar item!");
    await salaModel.buscarSalaPorIdEPorUsuario(idSala, idCliente)
        .then(function (resultado) {
            if (resultado.length > 0) {
                console.log('Sala já existe no banco');
                // res.status(400);
            } else {
                salaModel.cadastrar(idCliente, idSala, nomeSala)
                .then(function (resultado) {
                    console.log(`Sala cadastrada para o usuario ${idCliente}`);
                    
                    // res.status(200).json(resultado);
                }).catch(function (erro) {
                    res.status(500).json(erro.sqlMessage);
                })
            }
        })

    await pacoteModel.buscarPacotePorIdEPorUsuario(idPacote, idCliente)
        .then(function (resultado) {
            if (resultado.length > 0) {
                console.log('Pacote já existe no banco');
                // res.status(400);
            } else {
                pacoteModel.cadastrar(idCliente, idPacote, nomePacote, idSala).then(function (resultado) {
                    console.log(`Pacote cadastrada para o usuario ${idCliente}`);
                    // res.status(200).json(resultado);
                }).catch(function (erro) {
                    console.log(erro);
                    
                    res.status(500).json(erro.sqlMessage);
                })
            }
        })

    await itemModel.buscarItemPorId(idItem)
        .then(function (resultado) {
            if (resultado.length > 0) {
                //console.log('Item já existe no banco');
                // res.status(400);
                itemModel.verificarStatusItem(idItem)
                    .then(function (resultado) {
                        var statusItem = resultado[0].status;
                        if (statusItem == 1) {
                            itemModel.AtualizarStatusItem(idItem, 0)
                                .then(function (resultado) {
                                    res.status(200).json(resultado);
                                }).catch(function (erro) {
                                    res.status(500).json(erro.sqlMessage);
                                })
                        } else {
                            itemModel.AtualizarStatusItem(idItem, 1)
                                .then(function (resultado) {
                                    res.status(200).json(resultado);
                                }).catch(function (erro) {
                                    res.status(500).json(erro.sqlMessage);
                                })
                        }
                    })
                    .catch(function (erro) {
                        res.status(500).json("Erro");
                    })
            } else {
                itemModel.cadastrar(idItem, nomeItem, idPacote, idCliente).then(function (resultado) {
                    res.status(200).json(resultado);
                }).catch(function (erro) {
                    res.status(500).json(erro.sqlMessage);
                })
            }
        })
}

module.exports = {
    entregarItem,
    listar,
    listarCERTO
};


