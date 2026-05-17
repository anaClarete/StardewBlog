var express = require("express");
var router = express.Router();

// var itemController = require("../controllers/itemController");


router.post("/cadastrar", function (req, res) {
    // função a ser chamada quando acessar /carros/cadastrar
    //itemController.cadastrar(req, res);
    console.log(req.body);
});

router.get("/listar", function (req, res) {
    // função a ser chamada quando acessar /carros/listar
    itemController.listar(req, res);
});

router.get("/atualizar", function(req,res){
    itemController.atualizar(req,res);
});

module.exports = router;