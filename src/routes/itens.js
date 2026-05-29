var express = require("express");
var router = express.Router();

var itemController = require("../controllers/itemController");


router.post("/entregar_item", function (req, res) {
    // função a ser chamada quando acessar /carros/cadastrar
    console.log("Entrei na rota entregar item!");
    itemController.entregarItem(req, res);
});

// router.get("/listar/:idUsuario/:idSala", function (req, res) {

//     //console.log("Entrou na rota listar");
//     // função a ser chamada quando acessar /carros/listar
//     itemController.listar(req, res);
// });

router.get("/listarTotal/:idUsuario", function(req,res){
    itemController.listarTotal(req,res);
});

router.get("/listar/:idUsuario", function (req, res) {

    //console.log("Entrou na rota listar");
    // função a ser chamada quando acessar /carros/listar
    itemController.listar(req, res);
});

router.get("/atualizar", function(req,res){
    itemController.atualizar(req,res);
});

module.exports = router;