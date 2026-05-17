-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE stardewblog;
USE stardewblog;

CREATE TABLE usuario(
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(50),
email VARCHAR(50),
senha VARCHAR(30)
);

CREATE TABLE salas(
idSala INT PRIMARY KEY,
nome VARCHAR(50),
fkUsuario INT,
CONSTRAINT ctFKUsuario 
FOREIGN KEY(fkUsuario)
REFERENCES usuario(idUsuario)
);

CREATE TABLE pacotes (
idPacote INT PRIMARY KEY,
nome VARCHAR(50),
fkSala INT,
fkUsuario INT,
CONSTRAINT ctFkSala
FOREIGN KEY(fkSala)
REFERENCES salas(idSala),
CONSTRAINT ctFKUsuario 
FOREIGN KEY(fkUsuario)
REFERENCES usuario(idUsuario)
);

CREATE TABLE itens (
idItem INT PRIMARY KEY,
nome VARCHAR(50),
fkPacote INT,
fkUsuario INT,
status TINYINT,
CONSTRAINT ckFkUsuario
FOREIGN KEY (fkUsuario)
REFERENCES usuario(idUsuario)
CONSTRAINT ctFkPacote
FOREIGN KEY (fkPacote) 
REFERENCES pacotes(idPacote)
);

