var itemModel = require("../models/itemModel");
var salaModel = require("../models/salaModel");
var pacoteModel = require("../models/pacoteModel");

function listar(req, res) {
    itemModel.listar().then(function (resultado) {
        // precisamos informar que o resultado voltará para o front-end como uma resposta em json
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}




function entregarItem(req, res) {
    let dados = req['body']['dados'];
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

    salaModel.buscarSalaPorId(idSala)
        .then(function (resultado) {
            if (resultado.length > 0) {
                console.log('Sala já existe no banco');
                res.status(400);
            } else {
                salaModel.cadastrar(idCliente, idSala, nomeSala).then(function (resultado) {
                    res.status(200).json(resultado);
                }).catch(function (erro) {
                    res.status(500).json(erro.sqlMessage);
                })
            }
        })

    pacoteModel.buscarPacotePorId(idPacote)
        .then(function (resultado) {
            if (resultado.length > 0) {
                console.log('Pacote já existe no banco');
                res.status(400);
            } else {

                pacoteModel.cadastrar(idCliente, idPacote, nomePacote, idSala).then(function (resultado) {
                    res.status(200).json(resultado);
                }).catch(function (erro) {
                    res.status(500).json(erro.sqlMessage);
                })
            }
        })

        itemModel.buscarItemPorId(idItem)
            .then(function (resultado) {
                if (resultado.length > 0) {
                    console.log('Item já existe no banco');
                    res.status(400);
                }else{
                    itemModel.cadastrar(idItem, nomeItem, idPacote, idCliente).then(function (resultado) {
                        res.status(200).json(resultado);
                    }).catch(function (erro) {
                        res.status(500).json(erro.sqlMessage);
                    })
                }
        })
}        

module.exports = {
    entregarItem
};


