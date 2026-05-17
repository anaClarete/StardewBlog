var express = require("express");
var router = express.Router();

var itemController = require("../controllers/itemController");


router.post("/entregar_item", function (req, res) {
    // função a ser chamada quando acessar /carros/cadastrar
    itemController.entregarItem(req, res);
});

router.get("/listar", function (req, res) {
    // função a ser chamada quando acessar /carros/listar
    itemController.listar(req, res);
});

router.get("/atualizar", function(req,res){
    itemController.atualizar(req,res);
});

module.exports = router;